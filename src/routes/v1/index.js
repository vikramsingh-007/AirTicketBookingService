const express = require("express");

const { BookingController } = require("../../controllers/index");
const { BookingMiddleware } = require("../../middlewares/index");

const router = express.Router();

router.use(
  "/bookings",
  BookingMiddleware.validateCreateBooking,
  BookingController.create
);

module.exports = router;
