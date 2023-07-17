import mongoose from "mongoose";
import Movie from "./MovieModel.js";
import Hall from "./HallModel.js";
import Seat from "./SeatModel.js";
const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    date: {
      type: Date,
      require: true,
    },
    isCancel: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
