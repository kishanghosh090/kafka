import { Kafka } from "kafkajs";

// Force numeric parsing to prevent NaN errors
const brokerHost = process.env.KAFKA_HOST || "135.235.136.136";
const brokerPort = parseInt("9092");

export const kafka = new Kafka({
  clientId: "venthenApp",
  brokers: [`${brokerHost}:${brokerPort}`],
  requestTimeout: 1000,
  connectionTimeout: 1000,
});
