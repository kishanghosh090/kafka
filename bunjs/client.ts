import { Kafka } from "kafkajs";

process.on("warning", (warning) => {
  if (warning?.name === "TimeoutNegativeWarning") {
    return;
  }
  console.warn(warning);
});

export const kafka = new Kafka({
  brokers: ["192.168.1.8:9092"],
  clientId: "my-kafka",
});
