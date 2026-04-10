import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser"
import { Server } from "socket.io";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";

const app = express();

const server = http.createServer(app);

app.use(express.json({limit: "10mb"}));
app.use(cookieParser())
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  }),
);

export const userSocketMap = {};

export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", async (socket) => {
  const userId = socket.handshake.auth.userId;
  userSocketMap[userId] = socket.id;
  console.log("user connected");
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // console.log(1, userSocketMap);

  // socket.on("message", (data) => {
  //   console.log(data);
  // });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete userSocketMap[userId];
    // console.log(2, userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use("/api/status", (req, res) => {
  res.send("Server is listening");
});
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.use((err, req, res, next) => {
  console.log(500, err);
  return res.status(500).json({
    success: false,
    message: "something went wrong",
    error: err.message,
  });
});

export default server;