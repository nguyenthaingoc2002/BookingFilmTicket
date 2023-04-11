import express from "express";
import moment from "moment";
const router = express.Router();
import querystring from "qs";
import {
  createPayment,
  updatePayment,
} from "../controllers/paymentController.js";
import Payment from "../models/PaymentModel.js";
import axios from "axios";
const { createHmac } = await import("node:crypto");

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

router.post("/create_payment_url", function (req, res) {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  const { amount } = req.body;
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = "OC3SMDIU";
  let secretKey = "UJFGOSLYGXIUGXKFJBKIRMLWSNCMNTFZ";
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  let returnUrl = "http://localhost:3001/api/payment/vnpay_return";
  let orderId = moment(date).format("DDHHmmss");
  let bankCode = "";

  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  createPayment(orderId, createDate);

  res.status(200).json({
    success: true,
    vnpUrl: vnpUrl,
  });
});

router.get("/vnpay_return", async function (req, res, next) {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let tmnCode = "OC3SMDIU";
  let secretKey = "UJFGOSLYGXIUGXKFJBKIRMLWSNCMNTFZ";

  let signData = querystring.stringify(vnp_Params, { encode: false });

  let hmac = createHmac("sha512", secretKey);

  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed && vnp_Params["vnp_ResponseCode"] == "00") {
    let vnp_TxnRef = vnp_Params["vnp_TxnRef"];
    const payment = await Payment.findOne({ vnp_TxnRef: vnp_TxnRef });
    await updatePayment(payment.id, { state: 1 });
    res.json({ success: true, payment_id: payment.id });
  } else {
    res.json({ success: false });
  }
});

router.post("/refund", async function (req, res, next) {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let vnp_TmnCode = "OC3SMDIU";
  let secretKey = "UJFGOSLYGXIUGXKFJBKIRMLWSNCMNTFZ";
  let vnp_Api = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";

  let vnp_TxnRef = req.body.vnp_TxnRef;
  let vnp_TransactionDate = req.body.vnp_TransactionDate;

  let vnp_Amount = req.body.vnp_Amount * 100;
  let vnp_TransactionType = "02";
  let vnp_CreateBy = req.body.vnp_CreateBy;

  let currCode = "VND";
  let date = new Date();
  let vnp_RequestId = moment(date).format("HHmmss");
  let vnp_Version = "2.1.0";
  let vnp_Command = "refund";
  let vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

  let vnp_IpAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

  let vnp_TransactionNo = "0";

  let data =
    vnp_RequestId +
    "|" +
    vnp_Version +
    "|" +
    vnp_Command +
    "|" +
    vnp_TmnCode +
    "|" +
    vnp_TransactionType +
    "|" +
    vnp_TxnRef +
    "|" +
    vnp_Amount +
    "|" +
    vnp_TransactionNo +
    "|" +
    vnp_TransactionDate +
    "|" +
    vnp_CreateBy +
    "|" +
    vnp_CreateDate +
    "|" +
    vnp_IpAddr +
    "|" +
    vnp_OrderInfo;
  let hmac = createHmac("sha512", secretKey);
  let vnp_SecureHash = hmac.update(new Buffer(data, "utf-8")).digest("hex");

  let dataObj = {
    vnp_RequestId: vnp_RequestId,
    vnp_Version: vnp_Version,
    vnp_Command: vnp_Command,
    vnp_TmnCode: vnp_TmnCode,
    vnp_TransactionType: vnp_TransactionType,
    vnp_TxnRef: vnp_TxnRef,
    vnp_Amount: vnp_Amount,
    vnp_TransactionNo: vnp_TransactionNo,
    vnp_CreateBy: vnp_CreateBy,
    vnp_OrderInfo: vnp_OrderInfo,
    vnp_TransactionDate: vnp_TransactionDate,
    vnp_CreateDate: vnp_CreateDate,
    vnp_IpAddr: vnp_IpAddr,
    vnp_SecureHash: vnp_SecureHash,
  };

    const response = await axios.post(`${vnp_Api}`, dataObj);
    const payment = await Payment.findOne({ vnp_TxnRef: vnp_TxnRef });
    await updatePayment(payment.id, { state: 2 });
    if(response.data.vnp_ResponseCode == "00") {
        res.status(200).json({
            success: true,
            msg: "refund success"
        })
    } else {
        res.status(400).json({ msg: "Refund fail" });
    }
});

export default router;
