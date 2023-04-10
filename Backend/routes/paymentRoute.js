import express from "express";
import moment from "moment";
const router = express.Router();
import CryptoJS from "crypto-js";
import sortObject from "sort-object";
// let crypto = require("crypto"); 
import crypto from "crypto" 
import querystring from "qs";
import { log } from "console";
router.get('/create_payment_url', function (req, res, next) {
    
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    date.setDate(date.getDate() + 1);
    let expireDate = moment(date).format('YYYYMMDDHHmmss');
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress;

    // let config = require('config');
    
    let tmnCode = "274H9V91";
    let secretKey = "GLEDSNKZFVESPUMTITTKXVZYTSSXKZYG";
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    let returnUrl = "localhost:3001/payment/vnpay_return"
    let orderId = moment(date).format('DDHHmmss');
    let amount = 1000000;
    let locale = "vn";
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'ThanhtoanchomaGD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = expireDate;
    vnp_Params['vnp_TxnRef'] = "111111111";

    vnp_Params = sortObject(vnp_Params);

    
    let signData = querystring.stringify(vnp_Params, { encode: false });
    // var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
       
    // let hmac = crypto.createHmac("sha512", secretKey);
    var hash = CryptoJS.HmacSHA512(signData, secretKey);
    // let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
    // let signed = hmac.update(signData.toString(toString(CryptoJS.enc.Utf8))).toString(CryptoJS.enc.Hex); 
    let signed = hash.toString(CryptoJS.enc.Hex);
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log(vnpUrl);
    res.redirect(vnpUrl);
});

router.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha256", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");;     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        res.render('success', {code: '97'})
    }
});


export default router;