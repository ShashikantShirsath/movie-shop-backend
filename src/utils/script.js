import { connectDB } from "../config/db.js";
import { addMovieJob } from "../queue/movieQueue.js";

const movies = [
  {
    title: "Inception",
    description: "A thief enters dreams to steal secrets.",
    genre: "Sci-Fi",
    rating: 8.8,
    duration: 148,
    releaseDate: "2010-07-16",
    imdbId: "tt1375666",
  },
  {
    title: "Interstellar",
    description: "Explorers travel through a wormhole in space.",
    genre: "Sci-Fi",
    rating: 8.6,
    duration: 169,
    releaseDate: "2014-11-07",
    imdbId: "tt0816692",
  },
  {
    title: "The Dark Knight",
    description: "Batman faces the Joker.",
    genre: "Action",
    rating: 9.0,
    duration: 152,
    releaseDate: "2008-07-18",
    imdbId: "tt0468569",
  },
  {
    title: "Parasite",
    description: "A poor family infiltrates a rich household.",
    genre: "Thriller",
    rating: 8.5,
    duration: 132,
    releaseDate: "2019-05-30",
    imdbId: "tt6751668",
  },
  {
    title: "Avengers: Endgame",
    description: "The Avengers assemble one last time.",
    genre: "Superhero",
    rating: 8.4,
    duration: 181,
    releaseDate: "2019-04-26",
    imdbId: "tt4154796",
  },
  {
    title: "3 Idiots",
    description: "Three friends challenge the education system.",
    genre: "Drama",
    rating: 8.4,
    duration: 170,
    releaseDate: "2009-12-25",
    imdbId: "tt1187043",
  },
  {
    title: "Gladiator",
    description: "A Roman general seeks revenge.",
    genre: "Action",
    rating: 8.5,
    duration: 155,
    releaseDate: "2000-05-05",
    imdbId: "tt0172495",
  },
  {
    title: "Titanic",
    description: "A love story aboard the Titanic.",
    genre: "Romance",
    rating: 7.9,
    duration: 195,
    releaseDate: "1997-12-19",
    imdbId: "tt0120338",
  },
  {
    title: "The Matrix",
    description: "A hacker discovers reality is a simulation.",
    genre: "Sci-Fi",
    rating: 8.7,
    duration: 136,
    releaseDate: "1999-03-31",
    imdbId: "tt0133093",
  },
  {
    title: "Fight Club",
    description: "An underground fight club changes lives.",
    genre: "Drama",
    rating: 8.8,
    duration: 139,
    releaseDate: "1999-10-15",
    imdbId: "tt0137523",
  },

  // ---- extra 10 ----
  {
    title: "Forrest Gump",
    description: "Life story of a simple man with a big heart.",
    genre: "Drama",
    rating: 8.8,
    duration: 142,
    releaseDate: "1994-07-06",
    imdbId: "tt0109830",
  },
  {
    title: "Joker",
    description: "A failed comedian descends into madness.",
    genre: "Crime",
    rating: 8.4,
    duration: 122,
    releaseDate: "2019-10-04",
    imdbId: "tt7286456",
  },
  {
    title: "The Prestige",
    description: "Two magicians battle obsession.",
    genre: "Mystery",
    rating: 8.5,
    duration: 130,
    releaseDate: "2006-10-20",
    imdbId: "tt0482571",
  },
  {
    title: "Whiplash",
    description: "A drummer pushed to greatness.",
    genre: "Drama",
    rating: 8.5,
    duration: 107,
    releaseDate: "2014-10-10",
    imdbId: "tt2582802",
  },
  {
    title: "The Lion King",
    description: "A lion cub claims his throne.",
    genre: "Animation",
    rating: 8.5,
    duration: 88,
    releaseDate: "1994-06-24",
    imdbId: "tt0110357",
  },
  {
    title: "Shutter Island",
    description: "A detective investigates a mental hospital.",
    genre: "Thriller",
    rating: 8.2,
    duration: 138,
    releaseDate: "2010-02-19",
    imdbId: "tt1130884",
  },
  {
    title: "Django Unchained",
    description: "A freed slave seeks justice.",
    genre: "Western",
    rating: 8.4,
    duration: 165,
    releaseDate: "2012-12-25",
    imdbId: "tt1853728",
  },
  {
    title: "The Shawshank Redemption",
    description: "Hope inside a prison.",
    genre: "Drama",
    rating: 9.3,
    duration: 142,
    releaseDate: "1994-09-23",
    imdbId: "tt0111161",
  },
  {
    title: "Se7en",
    description: "Detectives hunt a serial killer.",
    genre: "Crime",
    rating: 8.6,
    duration: 127,
    releaseDate: "1995-09-22",
    imdbId: "tt0114369",
  },
  {
    title: "Mad Max: Fury Road",
    description: "A high-octane desert chase.",
    genre: "Action",
    rating: 8.1,
    duration: 120,
    releaseDate: "2015-05-15",
    imdbId: "tt1392190",
  }
];

const seedMovies = async () => {
  await connectDB();

  for (const movie of movies) {
    await addMovieJob(movie);
    console.log(`📥 Queued: ${movie.title}`);
  }

  console.log("✅ All 20 movies added to queue");
  process.exit();
};

seedMovies();
