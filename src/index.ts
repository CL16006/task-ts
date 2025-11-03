import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import prisma from "./config/prisma";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
