import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import {verifyToken} from "../middlewares/authMiddleware.js"
const router = express.Router();
router.post("/",verifyToken, createBooking)

export default router;
