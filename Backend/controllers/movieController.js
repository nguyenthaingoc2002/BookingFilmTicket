import Movie from "../models/MovieModel.js";

export const createMovie = async (req, res) => {
  try {
    const { title, description, durationInMins, releaseDate, director, actor, url_image, url_trailer } =
      req.body;
    const newMovie = new Movie({
      title: title,
      description: description,
      durationInMins: durationInMins,
      releaseDate: releaseDate,
      director: director,
      actor: actor,
      url_image: url_image,
      url_trailer: url_trailer,
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

  export const deleteMovie = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.showID);
      await Movie.findByIdAndDelete(req.params.movieID);
      res.status(200).json({
        success: true,
        msg: "Delete Movie Success",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updateMovie = async (req, res) => {
    try {
      await Movie.findByIdAndUpdate(req.params.movieID, {$set: req.body});
      const updatedMovie = await Movie.findById(req.params.movieID)
      res.status(200).json({
        success: true,
        msg: "Update Movie Success",
        updatedMovie: updatedMovie,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };