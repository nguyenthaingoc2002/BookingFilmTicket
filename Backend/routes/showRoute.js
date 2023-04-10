import express from "express";
import { createShow, getShowByShowID, getShowByMovieID, getShowByDate, getShowByDateAndMovie, deleteShow, updateShow } from "../controllers/showController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/",verifyToken, createShow);
router.get("/getShowByShowID/:showID",verifyToken, getShowByShowID);
router.get("/getShowByMovieID/:movieID",verifyToken, getShowByMovieID);
router.get("/getShowByMovieID/:movieID/:Date",verifyToken, getShowByDateAndMovie);
router.get("/getShowByDate/:Date",verifyToken, getShowByDate);
router.put("/:showID",verifyToken, updateShow);
router.delete("/:showID",verifyToken, deleteShow);
export default router;
