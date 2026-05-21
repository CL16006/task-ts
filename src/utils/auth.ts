import { Response } from "express";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

export const signAuthToken = (userId: number) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET no está configurado");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "1d" });
};

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
};

