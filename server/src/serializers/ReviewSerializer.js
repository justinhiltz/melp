import VoteSerializer from "./VoteSerializer.js"

class ReviewSerializer {
    static async getSummary(review) {
      const allowedAttributes = ["id", "rating", "content", "userId"]
  
      let serializedReview = {}
      for (const attribute of allowedAttributes) {
        serializedReview[attribute] = review[attribute]
      }

      const votes = await review.$relatedQuery("votes")
      serializedReview.voteCount = await VoteSerializer.getSummary(votes)
      
      return serializedReview
    }
  }
  
  export default ReviewSerializer