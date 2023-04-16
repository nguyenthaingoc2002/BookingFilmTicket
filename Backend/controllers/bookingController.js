import Booking from "../models/bookingModel.js";
import { checkAvailableSeat, updateStateSeat } from "./seatController.js";
export const createBooking = async (showID, seats, amount, payment, userID) => {
  const newBooking = new Booking({
    user: userID,
    show: showID,
    seats: seats,
    amount: amount,
    payment: payment,
  });
  await newBooking.save();
  for (let seatID of seats) {
    updateStateSeat(seatID, true);
  }
};

export const getBookingByUser = async (req, res) => {
  try {
    const listBooking = await Booking.find({ user: req.user.id })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movie",
        },
      }).populate({
        path: "show",
        populate: {
          path: "hall",
          model: "Hall",
        },
      })
      .populate("seats")
      .populate("user")
      .populate("payment");
    res.status(200).json({
      success: true,
      msg: "getBookingByUser Success",
      listBooking: listBooking,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingID);
    for (let seatID of booking.seats) {
      updateStateSeat(seatID, false);
    }
    await Booking.findByIdAndDelete(req.params.bookingID);
    res.status(200).json({
      success: true,
      msg: "Delete Booking Success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelBooking = async (bookingID) => {
  const booking = await Booking.findById(bookingID);
  for (let seatID of booking.seats) {
    await updateStateSeat(seatID, false);
  }
  booking.isCancel = true;
  await booking.save();
};
