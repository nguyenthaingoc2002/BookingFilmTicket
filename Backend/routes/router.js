import authRoute from "./authRoute.js";
import movieRoute from "./movieRoute.js";
import express from "express";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/movie", movieRoute);
export default router;
