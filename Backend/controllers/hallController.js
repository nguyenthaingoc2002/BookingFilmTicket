import Hall from "../models/HallModel.js";

export const createHall = async (req, res) => {
  try {
    const {name, numberColumn, numberRow, type} = req.body;
    const newHall = new Hall({
        name,
        numberColumn,
        numberRow,
        type
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

export const getAllHall = async (req, res) => {
  try {
    const listHall = await Hall.find();
    res.status(200).json({
      success: true,
      msg: "Find All Hall Success",
      listHall: listHall,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};