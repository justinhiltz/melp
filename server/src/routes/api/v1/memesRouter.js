import express from "express";
import { Meme } from "../../../models/index.js";

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
      const memeId = req.params.id
      const meme = await Meme.query().findById(memeId)
      return res.status(200).json({ meme: meme })
  } catch (error) {
      return res.status(500).json({ errors: error })
  }
})

export default memesRouter;
