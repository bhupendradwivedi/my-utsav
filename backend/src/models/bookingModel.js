const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
    seats: { type: Number, required: true },

    amountPaid: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    
    ticket: {
      bookingId: String,
      qrCode: String, // can store base64 QR or external image link
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;