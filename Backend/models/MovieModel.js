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
      required: true,
    },
    actor: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      require: true
    },
    trailer_url: {
      type: String,
      require: true
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
