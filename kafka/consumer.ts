import { kafka } from "./client";

async function init() {
  const consumer = kafka.consumer({ groupId: "user-1" });

  await consumer.connect();

  await consumer.subscribe({ topic: "rider-update", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Decode the binary buffer to a UTF-8 string
      const messageValue = message.value ? message.value.toString() : null;

      console.log(
        `Topic: ${topic}, Partition: ${partition}, Message: ${messageValue}`,
      );
    },
  });
}

init();
