const bookingModel = require("../models/bookingModel");
const eventModel = require("../models/eventModel");

const createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id;
    const seats = 1;

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats < seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const amountPaid = event.price * seats;

    const booking = await bookingModel.create({
      user: userId,
      event: eventId,
      seats,
      amountPaid,
      paymentStatus: "success",
      ticket: {
        bookingId: Date.now().toString(),
        qrCode: "dummy_qr_code_string_here",
      },
    });

    event.availableSeats -= seats;
    await event.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await bookingModel
      .find({ user: userId })
      .populate("event", "title date venue price")
      .populate("user", "name email");

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingModel
      .findById(req.params.id)
      .populate("event")
      .populate("user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const event = await eventModel.findById(booking.event);
    if (event) {
      event.availableSeats += booking.seats;
      await event.save();
    }

    await booking.deleteOne();

    res.status(200).json({ message: "Booking cancelled successfully", success: true });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
};
