import express from "express";
import { createShow, getShowByShowID, getShowByMovieID, getShowByDate, getShowByDateAndMovie, deleteShow, updateShow, getAllShow } from "../controllers/showController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/",verifyToken, createShow);
router.get("/getShowByShowID/:showID", getShowByShowID);
router.get("/getShowByMovieID/:movieID", getShowByMovieID);
router.get("/getShowByMovieID/:movieID/:Date", getShowByDateAndMovie);
router.get("/getShowByDate/:Date", getShowByDate);
router.get("/", getAllShow);
router.put("/:showID",verifyToken, updateShow);
router.delete("/:showID",verifyToken, deleteShow);
export default router;
