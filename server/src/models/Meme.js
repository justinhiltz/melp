const Model = require("./Model.js");

class Meme extends Model {
  static get tableName() {
    return "memes";
  }

  static get relationMappings() {
    const { User, Review } = require("./index.js");
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "memes.userId",
          to: "users.id",
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "memes.id",
          to: "reviews.memeId",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "image"],
      properties: {
        title: { type: "string", minLength: 1 },
        image: { type: "string" },
        userId: { type: ["string", "integer"] },
      },
    };
  }
}

module.exports = Meme;
