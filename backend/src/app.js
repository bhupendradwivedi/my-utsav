const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("../src/routes/auth.routes");
const eventRoutes = require("../src/routes/event.routes");
const bookingRoutes = require("../src/routes/booking.routes");
const paymentRoutes = require("../src/routes/payment.routes");

const app = express();



app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
     
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

//  API routes
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;
