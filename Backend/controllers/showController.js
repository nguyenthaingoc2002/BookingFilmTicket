import Hall from "../models/HallModel.js";
import Show from "../models/ShowModel.js";
import Seat from "../models/SeatModel.js";
import {createSeatForShow} from "../controllers/seatController.js";
import mongoose from "mongoose";

export const createShow = async (req, res) => {
  try {
    const { startTime, endTime, movieID, hallID } = req.body;
    const hall = await Hall.findById(hallID);
    const seats = createSeatForShow(hall.numberRow, hall.numberColumn);
    const newShow = new Show({
      startTime: startTime,
      endTime: endTime,
      movie: movieID,
      hall: hallID,
      seats: seats,
    });
    newShow.save();
    res.status(200).json({
      success: true,
      msg: "Create Show Success",
      show: newShow,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShowByShowID = async (req, res) => {
  try {
    const show = await Show.findById(req.params.showID);
    res.status(200).json({
      success: true,
      msg: "Find Show Success",
      show: show,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShowByMovieID = async (req, res) => {
  try {
    const listShow = await Show.find({movie: req.params.movieID})
    res.status(200).json({
      success: true,
      msg: "Find Show Success",
      listShow: listShow,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShowByDate = async (req, res) => {
  try {
    const from = new Date(req.params.Date);
    const to = new Date(req.params.Date);
    to.setDate(from.getDate() + 1);
    const listShow = await Show.find({startTime: { $gte: from, $lte: to }})
    res.status(200).json({
      success: true,
      msg: "Find Show Success",
      listShow: listShow,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};