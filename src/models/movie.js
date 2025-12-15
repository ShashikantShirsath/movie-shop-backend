import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  },
  duration: {
    type: Number
  },
  releaseDate: Date,
});

movieSchema.index({ title: 1 });

movieSchema.index({ createdAt: -1 });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
