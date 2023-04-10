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
    state: {
      //1->chưa thanh toán 
      //2->đã thanh toán
      //3->đã hoàn tiền
      type: Number, 
      require: true,
      default: 1
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
