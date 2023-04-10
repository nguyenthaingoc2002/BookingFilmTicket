import express from "express";
import { createMovie, getMovie, getAllMovie, updateMovie, deleteMovie } from "../controllers/movieController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/",verifyToken, createMovie)
router.get("/:movieId",verifyToken, getMovie);
router.get("/",verifyToken, getAllMovie);
router.put("/:movieID",verifyToken, updateMovie);
router.delete("/:movieID",verifyToken, deleteMovie);
export default router;