import Queue from "bull";

export const movieQueue = new Queue(
  "movie-queue",
  "https://enormous-bug-20629.upstash.io"
);

export const addMovieJob = async (data) => {
  return movieQueue.add("add-movie", data, {
    attempts: 3,
    backoff: 5000,
    removeOnComplete: true,
    removeOnFail: false,
  });
};
