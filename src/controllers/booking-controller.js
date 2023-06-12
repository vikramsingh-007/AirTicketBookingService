const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { ROUTING_KEY } = require("../config/serverConfig");

class BookingController {
  constructor() {
    this.bookingService = new BookingService();
  }
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const data = { message: "success" };
    await publishMessage(channel, ROUTING_KEY, JSON.stringify(data));
    res.status(200).json({
      message: "successfully published the message",
    });
  }
  async create(req, res) {
    try {
      const response = await this.bookingService.create(req.body);
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
  }

  async update(req, res) {
    try {
      const response = await this.bookingService.update(req.params.id);
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
  }

  async get(req, res) {
    try {
      const response = await this.bookingService.get(req.params.id);
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
  }

  async getAll(req, res) {
    try {
      const response = await this.bookingService.getAll();
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
  }
}

module.exports = BookingController;
