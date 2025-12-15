import Queue from "bull";

export const movieQueue = new Queue(
  "movie-queue",
  "rediss://default:AVCVAAIncDE0Yjg4YTNiMWE2NTE0NDc2YTkzZWIyZGIwYjMwYmRmMHAxMjA2Mjk@enormous-bug-20629.upstash.io:6379"
);

export const addMovieJob = async (data) => {
  return movieQueue.add("add-movie", data, {
    attempts: 3,
    backoff: 5000,
    removeOnComplete: true,
    removeOnFail: false,
  });
};
