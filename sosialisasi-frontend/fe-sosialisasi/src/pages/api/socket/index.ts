import { Server } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/Next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (!res.socket.server.io) {
    console.log("🔌 Inisialisasi Socket.IO...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("joinRoom", (userId: string) => {
        socket.join(userId);
        console.log("User join room:", userId);
      });

      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        io.to(receiverId).emit("receiveMessage", {
          senderId,
          receiverId,
          text,
          createdAt: new Date(),
        });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
