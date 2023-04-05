import express from "express";
import { createHall } from "../controllers/hallController.js";

const router = express.Router();
router.post("/", createHall)

export default router;
