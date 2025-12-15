import { movieQueue } from "./movieQueue.js";
import Movie from "../models/movie.js";

export const startWorker = () => {
  console.log("Starting movie worker...");

  movieQueue.process("add-movie", 1, async (job) => {
    console.log("Processing:", job.data.title);
    return await Movie.create(job.data);
  });

  movieQueue.on("completed", (job) => {
    console.log("Job completed:", job.id);
  });

  movieQueue.on("failed", (job, err) => {
    console.error("Job failed:", err.message);
  });
};
