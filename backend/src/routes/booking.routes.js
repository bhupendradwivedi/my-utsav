const express = require("express");
const { authUser, authRole } = require("../middlewares/auth.middleware");
const { createBooking, getUserBookings, getBookingById, cancelBooking } = require("../controllers/booking.controller");



const router = express.Router();

router.post("/",authUser,createBooking)

router.get("/",authUser,getUserBookings)

router.get("/:id",authUser,getBookingById)

router.delete("/:id",authUser,cancelBooking)


module.exports=router;


