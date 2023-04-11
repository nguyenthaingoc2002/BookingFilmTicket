import Seat from "../models/SeatModel.js";
import Hall from "../models/HallModel.js";

export const createSeat = (row, column, type) => {
  const newSeat = new Seat({
    row,
    column,
    type,
  });
  return newSeat;
};

export const createSeatForShow = async (hallID) => {
  const hall = await Hall.findById(hallID);
  const numberRow = hall.numberRow;
  const numberColumn = hall.numberColumn;
  const seats = [];
  for (let x = 1; x <= numberRow; x++) {
    for (let y = 1; y <= numberColumn; y++) {
      let type;
      if (x <= 3) {
        type = 1;
      } else if (x <= numberRow - 1) {
        type = 2;
      } else {
        type = 3;
      }
      const seat = new Seat({
        row: x,
        column: y,
        type: type,
      });
      await seat.save();
      seats.push(seat);
    }
  }
  return seats;
};
export const checkAvailableSeat = async (seatID) => {
  const seat = await Seat.findById(seatID);
  if(seat.state) return true;
  else return false;
}

export const updateStateSeat = async (seatID, state) => {
  const seat = await Seat.findById(seatID);
  seat.state = state;
  await seat.save();
};

export const deleteSeat = async (seatID) => {
  await Seat.findByIdAndDelete(seatID);
}