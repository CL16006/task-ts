import { Router } from "express";
import { register, login,loginStep1,loginStep2 } from "../controllers/authController";
import { logout } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", loginStep1);
router.post("/verify-otp", loginStep2);
router.post("/logout", logout);

export default router;
