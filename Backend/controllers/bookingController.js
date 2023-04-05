import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
  try {
    const { name, numberColumn, numberRow, type } = req.body;
    const newHall = new Hall({
      name,
      numberColumn,
      numberRow,
      type,
    });
    newHall.save();
    res.status(200).json({
      success: true,
      msg: "Create Hall Success",
      hall: newHall,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
