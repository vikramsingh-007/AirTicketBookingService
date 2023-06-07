const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models/index");
const { AppError, ValidationError } = require("../utils/errors/index");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      if (error.name == "SequelizeDatabaseError") {
        throw new AppError(
          "DatabaseError",
          "some data is incorrect",
          "Invalid values for Some Properties",
          StatusCodes.BAD_GATEWAY
        );
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create Booking",
        "There was some internal issue while creating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot update Booking",
        "There was some internal issue while updating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async get(bookingId) {
    try {
      const booking = await Booking.findByPk(bookingId);
      return booking;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot get Booking",
        "There was some internal issue while getting the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAll() {
    try {
      const bookings = await Booking.findAll();
      return bookings;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot get Booking",
        "There was some internal issue while getting the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
