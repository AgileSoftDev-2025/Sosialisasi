import { Server } from "socket.io";
import { Express } from "express";
import http from "http";

let io: Server;
let onlineUsers: Record<string, string> = {}; 

export function initSocket(app: Express) {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // USER JOIN ROOM (kirim userId)
 socket.on("joinRoom", (userId: any) => {
  userId = String(userId);
  socket.join(userId);
  onlineUsers[userId] = socket.id;

  console.log("ONLINE USERS:", onlineUsers);
  io.emit("onlineUsers", Object.keys(onlineUsers));
});



    // SEND MESSAGE
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      io.to(receiverId).emit("receiveMessage", {
        senderId,
        receiverId,
        text,
        created_at_message: new Date(),
      });
    });

    // HANDLE DISCONNECT
    socket.on("disconnect", () => {
      const userId = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );

      if (userId) {
        delete onlineUsers[userId];
        console.log(`User ${userId} offline.`);
        io.emit("onlineUsers", Object.keys(onlineUsers));
      }
    });
  });

  return server;
}

export function getIO() {
  if (!io) throw new Error("Socket belum diinit!");
  return io;
}
