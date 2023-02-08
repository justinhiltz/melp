import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    await Review.query().deleteById(reviewId);
    res.status(204).json({ message: "Review successfully deleted" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

reviewsRouter.patch("/:id", async (req, res) => {
    const { body } = req;
    const formInput = cleanUserInput(body);
    const { rating, content } = formInput;
    const reviewId = req.params.id;
  
    try {
      const editedReview = await Review.query().patchAndFetchById(reviewId, { rating, content });
      const serializedEditedReview = ReviewSerializer.getSummary(editedReview)
      return res.status(200).json({ review: serializedEditedReview });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data });
      }
      return res.status(500).json({ errors: error });
    }
});

export default reviewsRouter