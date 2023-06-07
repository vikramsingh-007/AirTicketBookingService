const express = require("express");

const { BookingController } = require("../../controllers/index");
const { BookingMiddleware } = require("../../middlewares/index");

const router = express.Router();

router.post(
  "/bookings",
  BookingMiddleware.validateCreateBooking,
  BookingController.create
);

router.patch("/bookings/:id", BookingController.update);
router.get("/bookings/:id", BookingController.get);
router.get("/bookings", BookingController.getAll);

module.exports = router;
