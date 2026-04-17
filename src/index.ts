import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import prisma from "./config/prisma";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import session from "express-session";
import passport from "./config/passport";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
