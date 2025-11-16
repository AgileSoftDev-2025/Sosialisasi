import { Response } from "express";
import { IReqUser } from "../middlewares/auth.middleware";
import MessageModel from "../models/message.models";
import mongoose from "mongoose";

export default {
  async createMessage(req: IReqUser, res: Response) {
    try {
      const senderId = req.user?.id;
      const receiverId = req.params.id.trim();
      const { text } = req.body;

      if (!senderId) {
        return res.status(401).json({ message: "User tidak terautentikasi." });
      }

      if (!text || text.trim() === "") {
        return res.status(400).json({ message: "Pesan tidak boleh kosong." });
      }

      if (senderId.toString() === receiverId) {
        return res.status(400).json({
          message: "Tidak bisa mengirim pesan ke diri sendiri.",
        });
      }

      if (!mongoose.isValidObjectId(receiverId)) {
        return res.status(400).json({ message: "ReceiverId tidak valid." });
      }

      const newMessage = await MessageModel.create({
        senderId: new mongoose.Types.ObjectId(senderId),
        receiverId: new mongoose.Types.ObjectId(receiverId),
        text: text,
        created_at_message: new Date(),
        status_message: true,
      });

      return res.status(201).json({
        message: "Pesan berhasil dikirim.",
        data: newMessage,
      });
    } catch (error: any) {
      console.error("ERROR MESSAGE:", error.message);
      console.error("FULL ERROR:", error);

      return res.status(500).json({
        message: "Terjadi kesalahan server saat mengirim pesan.",
        error: error.message,
      });
    }
  },

  async getMessageById(req: IReqUser, res: Response) {
    try {
      const currentUserId = req.user?.id;
      const receiverId = req.params.id.trim();

      if (!currentUserId) {
        return res.status(401).json({ message: "User tidak terautentikasi." });
      }

      const messages = await MessageModel.find({
        $or: [
          { senderId: currentUserId, receiverId: receiverId },
          { senderId: receiverId, receiverId: currentUserId },
        ],
      })
        .sort({ created_at_message: 1 })
        .lean();

      return res.status(200).json({
        message: "Berhasil mengambil percakapan.",
        totalMessages: messages.length,
        data: messages,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan server saat mengambil pesan.",
        error,
      });
    }
  },
};
