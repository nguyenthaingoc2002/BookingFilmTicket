import axios from "axios";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
// APP INFO
const config = {
  appid: "553",
  key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
  key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
};

const embeddata = {
  merchantinfo: "embeddata123",
};

const items = [
  {
    itemid: "knb",
    itemname: "kim nguyen bao",
    itemprice: 198400,
    itemquantity: 1,
  },
];

const order = {
  appid: config.appid,
  apptransid: `${moment().format("YYMMDD")}_${uuidv4()}`, // mã giao dich có định dạng yyMMdd_xxxx
  appuser: "demo",
  apptime: Date.now(), // miliseconds
  item: JSON.stringify(items),
  embeddata: JSON.stringify(embeddata),
  amount: 50000,
  description: "ZaloPay Integration Demo",
  bankcode: "",
};

// appid|apptransid|appuser|amount|apptime|embeddata|item
const data =
  config.appid +
  "|" +
  order.apptransid +
  "|" +
  order.appuser +
  "|" +
  order.amount +
  "|" +
  order.apptime +
  "|" +
  order.embeddata +
  "|" +
  order.item;
order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

axios
  .post(config.endpoint, null, { params: order })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => console.log(err));
