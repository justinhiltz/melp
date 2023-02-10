import express from "express"
import { Vote, Review } from "../../../models/index.js"
import VoteSerializer from "../../../serializers/VoteSerializer.js"
import objection from "objection"
const {ValidationError} = objection

const reviewsVotesRouter = new express.Router({ mergeParams: true })

reviewsVotesRouter.post("/", async (req, res) => {
    const body = req.body
    body.reviewId = req.params.reviewId
    body.userId = req.user.id
    try {
      const newVote = await Vote.addVote(body)
      const review = await Review.query().findById(body.reviewId)
      const votes = await review.$relatedQuery("votes")
      const newVoteCount = await VoteSerializer.getSummary(votes)
      return res.status(201).json({newVoteCount: newVoteCount})
    } catch (error) {
        console.log(error)
      if (error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
      return res.status(500).json({ errors: error })
    }
})

export default reviewsVotesRouter