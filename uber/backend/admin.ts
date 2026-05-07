import { kafka } from "./client";

async function init() {
  const admin = kafka.admin();
  console.log("admin connecting");

  await admin.connect();
  console.log("admin connected!!");

  console.log("creating topics ....");

  await admin.createTopics({
    topics: [
      {
        topic: "rider-update",
        numPartitions: 2,
      },
    ],
  });
  console.log("disconnecting admin");

  await admin.disconnect();
}
init();
