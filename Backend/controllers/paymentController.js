import Payment from "../models/PaymentModel.js";

export const createPayment = async (
  vnp_TxnRef,
  vnp_TransactionDate
) => {
  const payment = await Payment({
    vnp_TxnRef: vnp_TxnRef,
    vnp_TransactionDate: vnp_TransactionDate,
  });
  await payment.save();
};

export const updatePayment = async (id, data) => {
    await Payment.findByIdAndUpdate(id, {$set: data});
}