import authRoute from "./authRoute.js";
import movieRoute from "./movieRoute.js";
import hallRoute from "./hallRoute.js";
import showRoute from "./showRoute.js";
import express from "express";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/movie", movieRoute);
router.use("/hall", hallRoute);
router.use("/show", showRoute);
export default router;
