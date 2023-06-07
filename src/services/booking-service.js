const axios = require("axios");

const { BookingRepository } = require("../repository/index");
const { ServiceError } = require("../utils/errors/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async create(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "Seats are not available for this flight"
        );
      }
      let totalCost = priceOfTheFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return finalBooking;
    } catch (error) {
      if (
        error.name == "RepositoryError" ||
        error.name == "ValidationError" ||
        error.name == "DatabaseError" ||
        error.name == "ServiceError"
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async update(bookingId) {
    try {
      const booking = await this.bookingRepository.get(bookingId);
      if (booking.status == "Cancelled") {
        throw new ServiceError(
          "Cannot Cancel Ticket",
          "Ticket is already cancelled"
        );
      }
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      const date = new Date();
      date.setHours(date.getHours() + 4);
      if (date > flightData.departureTime) {
        throw new ServiceError(
          "Cannot Cancel Ticket",
          "Ticket can only be cancelled 4 hours before the departure"
        );
      }
      const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats + booking.noOfSeats,
      });
      const finalResponse = await this.bookingRepository.update(bookingId, {
        status: "Cancelled",
      });
      return finalResponse;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ServiceError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async get(bookingId) {
    try {
      const booking = await this.bookingRepository.get(bookingId);
      return booking;
    } catch (error) {
      if (error.name == "RepositoryError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async getAll() {
    try {
      const bookings = await this.bookingRepository.getAll();
      return bookings;
    } catch (error) {
      if (error.name == "RepositoryError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
