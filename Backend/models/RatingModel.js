import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating_score: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);
export default Rating;
