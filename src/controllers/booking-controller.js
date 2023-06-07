const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      message: "Successfully Completed Booking",
      err: {},
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      err: error.explanation,
      data: {},
      success: false,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await bookingService.update(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Successfully Cancelled the Booking",
      err: {},
      data: response,
      success: true,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      err: error.explanation,
      data: {},
      success: false,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await bookingService.get(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Successfully retrieved the Booking",
      err: {},
      data: response,
      success: true,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      err: error.explanation,
      data: {},
      success: false,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await bookingService.getAll();
    return res.status(StatusCodes.OK).json({
      message: "Successfully retrieved all the Bookings",
      err: {},
      data: response,
      success: true,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      err: error.explanation,
      data: {},
      success: false,
    });
  }
};

module.exports = {
  create,
  update,
  get,
  getAll,
};
