const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/payment.controller");
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create",authUser,createOrder)
router.post("/verify",verifyPayment)

module.exports = router;