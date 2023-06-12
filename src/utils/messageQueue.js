const amqplib = require("amqplib");

const {
  EXCHANGE_NAME,
  MESSAGE_BROKER_URL,
} = require("./../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    console.log("something went wrong while creating channel");
    throw error;
  }
};

const publishMessage = async (channel, routing_key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, routing_key, Buffer.from(message));
  } catch (error) {
    console.log("something went wrong while publishing the message");
    throw error;
  }
};

const subscribeMessage = async (channel, service, binding_key) => {
  try {
    const q = await channel.assertQueue("reminders_queue");
    await channel.bindQueue(q.queue, EXCHANGE_NAME, binding_key);
    await channel.consume(q.queue, (msg) => {
      if (msg) {
        console.log(msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("something went wrong while subscribing to message");
    throw error;
  }
};

module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage,
};
