import express from "express";
import { signUp, login, getUserProfile } from "../controllers/userController.mjs";
import { authenticate } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", authenticate, getUserProfile);

export default router;
//test
