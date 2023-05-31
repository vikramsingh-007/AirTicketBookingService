const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.create(req.body);
    return res.status(StatusCodes.OK).json({
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

module.exports = {
  create,
};
