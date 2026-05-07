import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { kafka } from "./client";
import { init } from "./consumer";

const PORT = 4006;
const HOST = "192.168.1.8";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://192.168.1.8:5173",
  },
});

void init(io);

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);
  socket.on("room", (data) => {
    console.log(data);
  });
  socket.on("send", async (data: any) => {
    const producer = kafka.producer();

    console.log("producer connecting...");
    await producer.connect();
    console.log("producer connected successfully");

    await producer.send({
      topic: "rider-update",
      messages: [
        {
          partition: 0,
          key: data.userID ?? socket.id,
          value: JSON.stringify({
            userID: data.userID ?? socket.id,
            lat: data.lat,
            lng: data.lng,
          }),
        },
      ],
    });
    await producer.disconnect();
  });
});

app.get("/", (req, res) => res.json({ msg: "hello from chai code " }));

server.listen(PORT, HOST, () => {
  console.log("server is listning...");
});
