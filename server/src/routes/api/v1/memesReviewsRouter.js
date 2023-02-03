import express from "express"
import objection from "objection"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js"
import { Review } from "../../../models/index.js"

const memesReviewsRouter = new express.Router({mergeParams: true})

memesReviewsRouter.post("/", async (req, res) => {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { rating, content } = formInput
    const { memeId } = req.params
    const userId = req.user.id

    try {
        const newReview = await Review.query().insertAndFetch({rating, content, memeId, userId})
        return res.status(201).json({review: newReview})
    } catch (error) {
        console.log(error)
        if(error instanceof ValidationError){
            return res.status(422).json({errors: error.data})
        }
        return res.status(500).json({errors: error})
    }
})

export default memesReviewsRouter