import express from "express";
import { createShow, getShowByShowID, getShowByMovieID, getShowByDate, getShowByDateAndMovie, deleteShow, updateShow } from "../controllers/showController.js";

const router = express.Router();
router.post("/", createShow);
router.get("/getShowByShowID/:showID", getShowByShowID);
router.get("/getShowByMovieID/:movieID", getShowByMovieID);
router.get("/getShowByMovieID/:movieID/:Date", getShowByDateAndMovie);
router.get("/getShowByDate/:Date", getShowByDate);
router.put("/:showID", updateShow);
router.delete("/:showID", deleteShow);
export default router;
