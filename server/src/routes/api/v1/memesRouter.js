import express from "express";
import objection from "objection";
import { Meme } from "../../../models/index.js";
const { ValidationError } = objection;

import ReviewSerializer from "../../../serializers/ReviewSerializer.js";

import cleanUserInput from "../../../services/cleanUserInput.js";

const memesRouter = new express.Router();

memesRouter.get("/", async (req, res) => {
  try {
    const memes = await Meme.query();
    return res.status(200).json({ memes: memes });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

memesRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const meme = await Meme.query().findById(id);

    const reviews = await meme.$relatedQuery("reviews");
    const serializedReviews = reviews.map(review => ReviewSerializer.getSummary(review))

    meme.reviews = serializedReviews;

    return res.status(200).json({ meme: meme });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

memesRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body);
  const { title, memeUrl } = formInput;
  const userId = req.user.id;
  try {
    const meme = await Meme.query().insertAndFetch({ title, memeUrl, userId });
    return res.status(201).json({ meme: meme });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default memesRouter;
