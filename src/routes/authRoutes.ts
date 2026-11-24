import express from "express";
import passport from "passport";
import { register, loginStep1, loginStep2, resendOtp, logout } from "../controllers/authController";
import { validateBody } from "../middlewares/validationMiddleware";
import { registerSchema, loginStep1Schema, loginStep2Schema, resendOtpSchema } from "../validators/schemas";

const router = express.Router();

// Ruta para registro de usuario
router.post("/register", validateBody(registerSchema), register);

// Ruta para login paso 1 (envío de OTP)
router.post("/login-step1", validateBody(loginStep1Schema), loginStep1);

// Ruta para login paso 2 (verificación de OTP)
router.post("/login-step2", validateBody(loginStep2Schema), loginStep2);

// Ruta para reenvío de OTP
router.post("/resend-otp", validateBody(resendOtpSchema), resendOtp);

// Ruta para logout
router.post("/logout", logout);

// Ruta para autenticación con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Ruta callback para Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const user = req.user as any;
    // Aquí se debería generar un token JWT o cookie de sesión
    // y redirigir al frontend con el token
    res.json({
      success: true,
      message: "Autenticación exitosa con Google",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }
);

export default router;
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),

  (req: any, res) => {
    const user = req.user as any;





    // Aquí se debería generar un token JWT o cookie de sesión
    // y redirigir al frontend con el token
    res.json({
      success: true,
      message: "Autenticación exitosa con Google",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }
);

export default router;

