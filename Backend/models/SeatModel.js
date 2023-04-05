import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    row: {
      type: Number,
      require: true,
    },
    column: {
      type: Number,
      require: true,
    },
    type: {
      type: Number,
      require: true,
    },
    state: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", SeatSchema);
export default Seat;
