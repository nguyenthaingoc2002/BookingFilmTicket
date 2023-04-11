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
    show: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Show",
    },
    seats: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seat",
    }],
    amount: {
      type: Number,
      require: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Payment",
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
