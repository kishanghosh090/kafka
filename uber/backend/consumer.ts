import { kafka } from "./client";

export async function init(io: any) {
  const consumer = kafka.consumer({ groupId: "user1" });

  console.log("connecting to kafka...");
  await consumer.connect();
  await consumer.subscribe({ topic: "rider-update" });

  await consumer.run({
    eachMessage: async function ({
      topic,
      partition,
      message,
      heartbeat,
      pause,
    }) {
      const payload = message.value?.toString();

      if (!payload) {
        return;
      }

      const location = JSON.parse(payload);
      console.log(topic);
      console.log(partition);
      console.log(location);
      io.emit("rider-location", location);
    },
  });
}
