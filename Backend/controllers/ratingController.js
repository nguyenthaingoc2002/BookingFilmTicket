import Rating from "../models/RatingModel.js";

export const createRating = async (req, res) => {
  try {
    const { rating_score, comment, movie } = req.body;
    const user = req.user.id;
    const newRating = new Rating({
      user: user,
      rating_score: rating_score,
      comment: comment,
      movie: movie,
    });
    await newRating.save();
    const rating = await Rating.findById(newRating.id).populate('user').populate('movie');
    res.status(200).json({
      success: true,
      msg: "Create Rating Success",
      newRating: rating,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRatingByMovieID = async (req, res) => {
  try {
    const listRating = await Rating.find({ movie: req.params.movieID }).populate('user').populate('movie');
    res.status(200).json({
      success: true,
      msg: "Find All Rating By Movie ID Success",
      listRating: listRating,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.ratingID);
    res.status(200).json({
      success: true,
      msg: "Delete Rating Success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
