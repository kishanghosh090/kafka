import { kafka } from "./client";

async function init() {
  const producer = kafka.producer();

  console.log("producer connecting...");
  await producer.connect();
  console.log("producer connected successfully");

  await producer.send({
    topic: "rider-update",
    messages: [
      {
        partition: 0,
        key: "kishan",
        value: JSON.stringify({ name: "chai aur code" }),
      },
    ],
  });
  await producer.disconnect();
}

// producer initialize
init();
