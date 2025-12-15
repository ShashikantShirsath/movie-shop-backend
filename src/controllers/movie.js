import Movie from "../models/movie.js";
import { addMovieJob } from "../queue/movieQueue.js";

export const getMovies = async (req, res) => {
  try {
    const {
      q = "",
      page = 1,
      sortBy = "createdAt",
      order = "desc",
      genre,
    } = req.query;

    const PAGE_SIZE = 20;
    const skip = (page - 1) * PAGE_SIZE;

    // 🔎 Search + Filter
    const query = {
      ...(q && {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      }),
      ...(genre && { genre }),
    };

    const total = await Movie.countDocuments(query);

    const movies = await Movie.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(PAGE_SIZE);

    res.json({
      data: movies,
      pagination: {
        total,
        page: Number(page),
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(total / PAGE_SIZE),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const searchMovies = async (req, res) => {
  const { q } = req.query;
  const movies = await Movie.find({
    $or: [
      { title: new RegExp(q, "i") },
      { description: new RegExp(q, "i") },
    ],
  });
  res.json(movies);
};

export const sortedMovies = async (req, res) => {
  const { sortBy } = req.query;
  const movies = await Movie.find().sort({ [sortBy]: 1 });
  res.json(movies);
};

export const addMovie = async (req, res) => {
  try {
    addMovieJob(req.body);
    res.status(201).json({ message: "Movie added to queue" });
  } catch (error) {
    console.error("Error adding movie:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
};

export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};
