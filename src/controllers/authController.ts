import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../services/email";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "Usuario registrado", user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.json({ message: "Logout exitoso" });
};

export const loginStep1 = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Credenciales inválidas" });

  // Generar OTP (6 dígitos)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Guardar OTP con expiración
  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpCode: otp,
      otpExpires: new Date(Date.now() + 5 * 60 * 1000), // expira en 5 min
    },
  });

  // Enviar email
  await sendOtpEmail(user.email, otp);

  res.json({ message: "Código enviado", status: "2FA_REQUIRED" });
};

export const loginStep2 = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.otpCode)
    return res.status(400).json({ message: "Código no válido" });

  if (user.otpCode !== code)
    return res.status(400).json({ message: "Código incorrecto" });

  if (user.otpExpires < new Date())
    return res.status(400).json({ message: "Código expirado" });

  // Limpiar OTP
  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpCode: null,
      otpExpires: null,
    },
  });

  // Generar JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Autenticado", status: "AUTHENTICATED" });
};