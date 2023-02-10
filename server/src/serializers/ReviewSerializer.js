class ReviewSerializer {
    static getSummary(review) {
      const allowedAttributes = ["id", "rating", "content", "userId"]
  
      let serializedReview = {}
      for (const attribute of allowedAttributes) {
        serializedReview[attribute] = review[attribute]
      }
  
      return serializedReview
    }
  }
  
  export default ReviewSerializer