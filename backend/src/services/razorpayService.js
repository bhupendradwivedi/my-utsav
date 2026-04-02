const razorpay = require("razorpay");

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})

module.exports = razorpayInstance;