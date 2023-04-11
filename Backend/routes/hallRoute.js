import express from "express";
import { createHall, getAllHall } from "../controllers/hallController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", verifyToken, createHall);
router.get("/", getAllHall);
export default router;
