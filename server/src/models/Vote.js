const Model = require("./Model.js")

class Vote extends Model{
    static get tableName(){
        return "votes"
    }

    static get jsonSchema(){
        return{
            type: "object",
            required: ["vote", "userId", "reviewId"],
            properties: {
                vote: {type: ["string", "integer"], minimum: -1, maximum: 1},
                userId: {type: ["string", "integer"]},
                reviewId: {type: ["string", "integer"]}
            }
        }
    }

    static get relationMappings(){
        const { User, Review } = require("./index.js")
        return {
            user:{
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join:{
                    from: "votes.userId",
                    to: "user.id"
                }
            },
            review: {
                relation: Model.BelongsToOneRelation,
                modelClass: Review,
                join: {
                  from: "votes.reviewId",
                  to: "review.id"
                }
              }
        }
    }

    static async addVote(newVote) {
        const voteExists = await Vote.query().findOne({userId: newVote.userId, reviewId: newVote.reviewId})
        let postedVote
        if (!voteExists) {
          postedVote = await Vote.query().insertAndFetch(newVote)
        } else if(voteExists.vote === newVote.vote){
            postedVote = await Vote.query().patchAndFetchById(voteExists.id, {
                vote: 0
              })
        }else{
          postedVote = await Vote.query().patchAndFetchById(voteExists.id, {
            vote: newVote.vote
          })
        }
        return postedVote
    }
    
}

module.exports = Vote