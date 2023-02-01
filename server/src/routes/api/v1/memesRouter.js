import express from "express";
import objection from "objection";
import { Meme } from "../../../models/index.js";
const { ValidationError } = objection;

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
  try {
    const memeId = req.params.id;
    const meme = await Meme.query().findById(memeId);
    return res.status(200).json({ meme: meme });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

memesRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body);
  const { title, memeUrl } = formInput;
  console.log(req.user);
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
