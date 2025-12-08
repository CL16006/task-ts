import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No autenticado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey") as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
