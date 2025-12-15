import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import { movieQueue } from "./movieQueue.js";
import Movie from "../models/movie.js";

export const startWorker = async () => {
  await connectDB();
  console.log("Worker DB connected");

  movieQueue.process("add-movie", async (job) => {
    console.log("Processing job:", job.id);
    return await Movie.create(job.data);
  });

  movieQueue.on("completed", (job) => {
    console.log("Job completed:", job.id);
  });

  movieQueue.on("failed", (job, err) => {
    console.error("Job failed:", err.message);
  });
};
