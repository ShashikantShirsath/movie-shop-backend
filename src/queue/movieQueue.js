import Queue from "bull";

export const movieQueue = new Queue(
  "movie-queue",
  process.env.REDIS_URL,
  {
    redis: {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
    defaultJobOptions: {
      attempts: 2,
      backoff: 3000,
      removeOnComplete: true,
    },
  }
);

export const addMovieJob = (data) => {
  // fire-and-forget (lazy insertion)
  movieQueue.add("add-movie", data);
};
