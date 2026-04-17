import { Router } from "express";
import { register,loginStep1,loginStep2, resendOtp } from "../controllers/authController";
import { logout } from "../controllers/authController";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", register);
router.post("/login", loginStep1);
router.post("/verify-otp", loginStep2);
router.post("/logout", logout);
router.post("/resend-otp", resendOtp)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.redirect("http://localhost:5173/tasks"); // frontend
  }
);

export default router;
