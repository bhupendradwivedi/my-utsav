const eventModel = require("../models/eventModel");
const uploadKit = require("../services/servicesStorage");

async function createEvent(req, res) {
  try {
    const { title, description, venue, date, totalSeats, price } = req.body;

    if (!title || !description || !venue || !date || !totalSeats || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Event image is required" });
    }

    const fileUrl = await uploadKit(req.file.buffer);

    const event = await eventModel.create({
      title,
      description,
      venue,
      date,
      image: fileUrl,
      totalSeats,
      price,
      availableSeats: totalSeats,
      organizer: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error occurred in createEvent:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error.message });
  }
}

const getallEvent = async (req, res) => {
  try {
    const events = await eventModel.find().populate("organizer", "name email");
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await eventModel
      .findById(req.params.id)
      .populate("organizer", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    console.error("Error fetching event:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      req.user.role !== "admin" &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    await eventModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    res
      .status(500)
      .json({ message: "Server Error in deleteEvent", error: error.message });
  }
};

module.exports = { createEvent, getallEvent, getEventById, deleteEvent };
