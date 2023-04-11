import express from "express";
import { getUser, updatePasswordUser, updateUser } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/",verifyToken, getUser);
router.put("/",verifyToken, updateUser);
router.put("/updatePassword",verifyToken, updatePasswordUser);
export default router;