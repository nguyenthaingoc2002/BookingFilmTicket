import authRoute from "./authRoute.js";
import movieRoute from "./movieRoute.js";
import hallRoute from "./hallRoute.js";
import showRoute from "./showRoute.js";
import bookingRoute from "./bookingRoute.js"
import express from "express";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/movie", movieRoute);
router.use("/hall", hallRoute);
router.use("/show", showRoute);
router.use("/booking", bookingRoute);
export default router;
