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
    const pageNumber = Number(page) || 1;
    const skip = (pageNumber - 1) * PAGE_SIZE;

    const query = {
      ...(q && {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      }),
      ...(genre && { genre }),
    };

    const allowedSortFields = ["createdAt", "rating", "title"];
    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const sortOrder =
      order?.toLowerCase() === "asc" ? 1 : -1;

    const total = await Movie.countDocuments(query);

    const movies = await Movie.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(PAGE_SIZE);

    res.json({
      data: movies,
      pagination: {
        total,
        page: pageNumber,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(total / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error(error);
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
    // addMovieJob(req.body);
    const { title, description, rating, duration, releaseDate } = req.body;
    if (!title || !description || rating === undefined || duration === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const movie = new Movie({ title, description, rating, duration, releaseDate, createdAt: new Date() });
    movie.save();
    res.status(201).json({ message: "Movie added to queue", movie });
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
