import { Server } from "socket.io";
import http from "http";
import { Express } from "express";

let io: Server;

export function initSocket(app: Express) {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("joinRoom", (userId: string) => {
      socket.join(userId);
      console.log(`User ${socket.id} join room ${userId}`);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      console.log("📨 pesan masuk:", senderId, "->", receiverId, text);

      io.to(receiverId).emit("receiveMessage", {
        senderId,
        receiverId,
        text,
        createdAt: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return server;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket IO belum diinisialisasi!");
  }
  return io;
}
