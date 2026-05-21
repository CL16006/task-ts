import { Router } from "express";
import { register,loginStep1,loginStep2, resendOtp } from "../controllers/authController";
import { logout } from "../controllers/authController";
import passport from "../config/passport";
import { setAuthCookie, signAuthToken } from "../utils/auth";

const router = Router();

router.post("/register", register);
router.post("/login", loginStep1);
router.post("/verify-otp", loginStep2);
router.post("/logout", logout);
router.post("/resend-otp", resendOtp)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = signAuthToken(user.id);
    setAuthCookie(res, token);

    res.redirect("http://localhost:5173/tasks"); // frontend
  }
);

export default router;
