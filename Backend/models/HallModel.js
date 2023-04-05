import mongoose from "mongoose";

const HallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    numberColumn: {
      type: Number,
      require: true,
    },
    numberRow: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Hall = mongoose.model("Hall", HallSchema);
export default Hall;
