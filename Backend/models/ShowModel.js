import mongoose from "mongoose";
import Movie from "./MovieModel.js";
import Hall from "./HallModel.js";
import Seat from "./SeatModel.js";
const ShowSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
    hall:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hall",
    },
    seats: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seat",
    }]
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", ShowSchema);
export default Show;
