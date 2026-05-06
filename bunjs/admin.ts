import { kafka } from "./client";

async function init() {
  const admin = kafka.admin();
  const topic = "rider-updates";
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin connected");

  try {
    console.log(`Creating Topic [${topic}]`);
    const created = await admin.createTopics({
      waitForLeaders: true,
      topics: [
        {
          topic,
          numPartitions: 2,
        },
      ],
    });

    if (created) {
      console.log("Topic created");
    } else {
      console.log("Topic already exists or no-op");
    }
  } catch (error) {
    console.error("Topic creation failed", error);
  } finally {
    console.log("Disconnecting admin");
    await admin.disconnect();
  }
}

init();
