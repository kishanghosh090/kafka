import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "uber",
  brokers: ["192.168.1.8:9092"],
});
