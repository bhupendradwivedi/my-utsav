const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentGateway: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
    status: {
      type: String,
      enum: ["created", "pending", "success", "failed", "refunded"],
      default: "created",
    },
    method: {
      type: String,
    },
    receipt: {
      type: String,
    },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;
