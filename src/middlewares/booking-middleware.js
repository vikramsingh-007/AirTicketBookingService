const { StatusCodes } = require("http-status-codes");

const validateCreateBooking = (req, res, next) => {
  if (!req.body.flightId || !req.body.userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "mandatroy data missing",
      err: "flighId or userId missing in the request",
      success: false,
      data: {},
    });
  }
  if (
    req.body.noOfSeats &&
    !(req.body.noOfSeats >= 1 && req.body.noOfSeats <= 5)
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Inappropriate values for noOfSeats",
      err: "noOfSeats should be between 1 to 5",
      success: false,
      data: {},
    });
  }
  if (!req.body.noOfSeats) {
    req.body.noOfSeats = 1;
  }
  next();
};

module.exports = {
  validateCreateBooking,
};
