import express from "express";
import { createMovie, getMovie, getAllMovie } from "../controllers/movieController.js";

const router = express.Router();
router.post("/", createMovie)
router.get("/:movieId", getMovie);
router.get("/", getAllMovie);

export default router;