import { Partitioners } from "kafkajs";
import { kafka } from "./client";

async function init() {
  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  console.log("producer connecting");
  await producer.connect();

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        partition: 0,
        key: "location update",
        value: JSON.stringify({ name: "tony stark", loc: "delhi" }),
      },
    ],
  });
  await producer.disconnect();
}

init();
