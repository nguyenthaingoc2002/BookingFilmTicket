import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookingByUser,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getBookingByUser);
router.delete("/:bookingID", verifyToken, deleteBooking);
export default router;
