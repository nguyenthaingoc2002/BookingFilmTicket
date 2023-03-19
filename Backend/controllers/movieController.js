import Movie from "../models/MovieModel.js";

export const createMovie = async (req, res) => {
  try {
    const { title, description, durationInMins, releaseDate, director, actor } =
      req.body;
    const newMovie = new Movie({
      title,
      description,
      durationInMins,
      releaseDate,
      director,
      actor,
    });
    newMovie.save();
    res.status(200).json({
      success: true,
      msg: "Create Movie Success",
      movie: newMovie,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovie = async (req, res) => {
    try {
        const {movieId} = req.params;
      const movie = await Movie.findById(movieId);
      res.status(200).json({
        success: true,
        msg: "Find Movie Success",
        movie: movie,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const getAllMovie = async (req, res) => {
    try {
      const allMovie = await Movie.find();
      res.status(200).json({
        success: true,
        msg: "Find All Movie Success",
        allMovie: allMovie,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };