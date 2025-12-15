import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import { movieQueue } from "./movieQueue.js";
import Movie from "../models/movie.js";

await connectDB();

movieQueue.process("add-movie", async (job) => {
  console.log("Inserting movie:", job.data.title);
  return await Movie.create(job.data);
});

movieQueue.on("completed", (job) => {
  console.log("Job Completed:", job.id);
});

movieQueue.on("failed", (job, err) => {
  console.error("Job Failed:", job.data, "Error:", err.message);
});