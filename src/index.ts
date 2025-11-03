import express from "express";
import dotenv from "dotenv";
import prisma from "./config/prisma";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ message: "🚀 API conectada a MySQL correctamente", users });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
