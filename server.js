dotenv.config();
dotenv.config({ path: ".env" });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./src/config/db.js";

import authRoutes from "./src/routes/authentication.js";
import movieRoutes from "./src/routes/movie.js";

await connectDB();

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// rate limiter
app.use(
  "/",
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    message: "Too many requests, try again later.",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
