import express from "express";
import { createMovie, getMovie, getAllMovie, updateMovie, deleteMovie } from "../controllers/movieController.js";

const router = express.Router();
router.post("/", createMovie)
router.get("/:movieId", getMovie);
router.get("/", getAllMovie);
router.put("/:movieID", updateMovie);
router.delete("/:movieID", deleteMovie);
export default router;