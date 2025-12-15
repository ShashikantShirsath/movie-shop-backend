import Queue from "bull";

export const movieQueue = new Queue(
  "movie-queue",
  "redis://127.0.0.1:6379"
);

export const addMovieJob = async (data) => {
  return movieQueue.add("add-movie", data, {
    attempts: 3,
    backoff: 5000,
    removeOnComplete: true,
    removeOnFail: false,
  });
};
