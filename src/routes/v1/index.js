const express = require("express");

const { BookingController } = require("../../controllers/index");
const { BookingMiddleware } = require("../../middlewares/index");

const router = express.Router();
const bookingController = new BookingController();

router.post(
  "/bookings",
  BookingMiddleware.validateCreateBooking,
  bookingController.create
);
router.post("/publish", bookingController.sendMessageToQueue);

router.patch("/bookings/:id", bookingController.update);
router.get("/bookings/:id", bookingController.get);
router.get("/bookings", bookingController.getAll);

module.exports = router;
