import Booking from "../models/bookingModel.js";
import {checkAvailableSeat, updateStateSeat} from "./seatController.js"
export const createBooking = async (req, res) => {
  try {
    const { showID, seatID, amount } = req.body;
    const userID = req.user.id;
    if(!checkAvailableSeat(seatID)) {
      res.status(500).json("Seat is not available");
    }
    const newBooking = new Booking({
      user: userID,
      show: showID,
      seat: seatID,
      amount: amount,
    });
    newBooking.save();
    updateStateSeat(seatID, true);
    res.status(200).json({
      success: true,
      msg: "Create Booking Success",
      booking: newBooking,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
