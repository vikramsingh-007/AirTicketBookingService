const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  ROUTING_KEY: process.env.ROUTING_KEY,
};
