import express from "express";
import { createRating, deleteRating, getRatingByMovieID } from "../controllers/ratingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/",verifyToken, createRating);
router.get("/getRatingByMovieID/:movieID", getRatingByMovieID);
router.delete("/:ratingID",verifyToken, deleteRating)
export default router;
