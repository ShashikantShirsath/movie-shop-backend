import cron from "node-cron";
import { movieQueue } from "./movieQueue.js";
import Movie from "../models/movie.js";

let workerStarted = false;

export const startWorkerWithCron = () => {
  cron.schedule("*/5 * * * * *", async () => {
    if (workerStarted) return;

    console.log("Starting movie worker via cron...");

    movieQueue.process(
      "add-movie",
      1,
      async (job) => {
        console.log("Processing:", job.data.title);
        return await Movie.create(job.data);
      }
    );

    movieQueue.on("completed", (job) => {
      console.log("Job completed:", job.id);
    });

    movieQueue.on("failed", (job, err) => {
      console.error("Job failed:", err.message);
    });

    workerStarted = true;
    console.log("Worker registered successfully");
  });
};
