import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    state: {
      //0: chưa thanh toán
      //1: đã thanh toán
      //2: hoàn tiền
      type: Number,
      require: true,
      default: 0,
    },
    vnp_TxnRef: {
      type: Number,
    },
    vnp_TransactionDate: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
