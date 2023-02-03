const Model = require("./Model")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get relationMappings() {
        const { User, Meme } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },
            meme: {
                relation: Model.BelongsToOneRelation,
                modelClass: Meme,
                join: {
                    from: "reviews.memeId",
                    to: "memes.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["rating"],
            properties: {
                review: { type: "string", minLength: 1 },
                rating: { type: ["integer", "string"], minimum: 0, maximum: 5 },
                userId: { type: ["integer", "string"] },
                memeId: { type: ["integer", "string"] }
            }
        }
    }
}

module.exports = Review