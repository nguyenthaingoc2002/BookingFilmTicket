import Hall from "../models/HallModel.js";
import Show from "../models/ShowModel.js";
import Seat from "../models/SeatModel.js";
import { createSeatForShow, deleteSeat } from "../controllers/seatController.js";
import mongoose from "mongoose";

export const createShow = async (req, res) => {
  try {
    const { startTime, endTime, movie, hall } = req.body;
    const seats = await createSeatForShow(hall);
    const newShow = new Show({
      startTime: startTime,
      endTime: endTime,
      movie: movie,
      hall: hall,
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
    const listShow = await Show.find({ movie: req.params.movieID });
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
    const listShow = await Show.find({ startTime: { $gte: from, $lte: to } });
    res.status(200).json({
      success: true,
      msg: "Find Show Success",
      listShow: listShow,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShowByDateAndMovie = async (req, res) => {
  try {
    const from = new Date(req.params.Date);
    const to = new Date(req.params.Date);
    to.setDate(from.getDate() + 1);
    const listShow = await Show.find({
      startTime: { $gte: from, $lte: to },
      movie: req.params.movieID,
    });
    res.status(200).json({
      success: true,
      msg: "Find Show Success",
      listShow: listShow,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllShow = async (req, res) => {
  try {
    const listShow = await Show.find();
    res.status(200).json({
      success: true,
      msg: "Find All Show Success",
      listShow: listShow,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.showID);
    for(let seat of show.seats) {
      deleteSeat(seat);
    }
    await Show.findByIdAndDelete(req.params.showID);
    res.status(200).json({
      success: true,
      msg: "Delete Show Success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateShow = async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.params.showID, {$set: req.body});
    const updatedShow = Show.findById(req.params.showID);
    res.status(200).json({
      success: true,
      msg: "Update Show Success",
      updatedShow: updatedShow,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
