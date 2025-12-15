import express from "express";
import {
  getMovies,
  searchMovies,
  sortedMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.js";

import { authMiddleware } from "../middlewares/authenticate.js";
import { roleMiddleware } from "../middlewares/role.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/sorted", sortedMovies);

router.post("/", authMiddleware, roleMiddleware("admin"), addMovie);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateMovie);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMovie);

export default router;