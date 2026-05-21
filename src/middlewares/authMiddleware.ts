import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  const secret = process.env.JWT_SECRET;

  if (!token) return res.status(401).json({ message: "No autenticado" });
  if (!secret) return res.status(500).json({ message: "Configuración JWT faltante" });

  try {
    const decoded = jwt.verify(token, secret) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
