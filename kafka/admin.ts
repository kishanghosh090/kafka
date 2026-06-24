import { kafka } from "./client";

async function init() {
  try {
    const admin = kafka.admin();

    console.log("admin connecting...");
    await admin.connect();
    console.log("Admin connection success ...");

    // create topic

    try {
      console.log("Creating Topic ...");
      await admin.createTopics({
        topics: [
          {
            topic: "rider-update",
            numPartitions: 2,
          },
        ],
      });
    } catch (error) {
      console.log(typeof error);
    }
    console.log("Topic created ...");
    await admin.disconnect();
    console.log("Admin disconnected");
  } catch (error) {
    console.log(error);
  }
}
init();
