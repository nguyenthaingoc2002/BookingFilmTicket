import Booking from "../models/bookingModel.js";
import {checkAvailableSeat, updateStateSeat} from "./seatController.js"
export const createBooking = async (req, res) => {
  try {
    const { showID, seats, amount } = req.body;
    const userID = req.user.id;
    const newBooking = new Booking({
      user: userID,
      show: showID,
      seats: seats,
      amount: amount,
    });
    await newBooking.save();
    const booking = await Booking.findById(newBooking.id).populate('show').populate('seats').populate('user')
    for(let seatID of seats) {
      if(!checkAvailableSeat(seatID)) {
        res.status(500).json("Seat is not available");
      }
      updateStateSeat(seatID, true);
    }
    res.status(200).json({
      success: true,
      msg: "Create Booking Success",
      newBooking: booking,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookingByUser = async (req, res) => {
  try {
    const listBooking = await Booking.find({user: req.user.id}).populate('show').populate('seats').populate('user');
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
    for(let seatID of booking.seats) {
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