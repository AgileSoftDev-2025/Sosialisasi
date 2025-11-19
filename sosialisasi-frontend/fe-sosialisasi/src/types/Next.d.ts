import { Server as IOServer } from "socket.io";
import { IncomingMessage, ServerResponse } from "http";

export type NextApiResponseServerIO = ServerResponse & {
  socket: any & {
    server: {
      io?: IOServer;
    };
  };
};
