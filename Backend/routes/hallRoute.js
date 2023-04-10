import express from "express";
import { createHall } from "../controllers/hallController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/",verifyToken, createHall)
export default router;
