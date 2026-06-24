import { kafka } from "./client";

(async function init() {
  const producer = kafka.producer();

  console.log("producer connecting...");
  await producer.connect();
  console.log("producer connected");

  await producer.send({
    topic: "rider-update",

    messages: [
      {
        partition: 0,
        key: "kishan",
        value: "this is rider from venthen faculty app team",
      },
      {
        key: "Deep",
        value: "this is rider from venthen student APPs team",
        partition: 1,
      },
    ],
  });
  await producer.disconnect();
})();
