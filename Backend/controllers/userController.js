import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    res.status(200).json({
      success: true,
      msg: "Find User Success",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userID = req.user.id;
    await User.findByIdAndUpdate(userID, { $set: req.body });
    const updatedUser = await User.findById(userID);
    res.status(200).json({
      success: true,
      msg: "Update User Success",
      updatedUser: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePasswordUser = async (req, res) => {
  try {
    const userID = req.user.id;
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(userID, { password: passwordHash });
    res.status(200).json({
      success: true,
      msg: "Update Password Success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
