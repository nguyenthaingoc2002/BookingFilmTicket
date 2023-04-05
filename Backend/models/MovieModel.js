import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    durationInMins: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    director: {
      type: String,
    },
    actor: {
      type: String,
    },
    image_url: {
      type: String,
    },
    trailer_url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
