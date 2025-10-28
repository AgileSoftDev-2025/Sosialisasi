import { Request, Response } from "express";
import * as Yup from "yup";
import ContentModel from "../models/content.models";
import { IReqUser } from "../middlewares/auth.middleware";

const contentValidateSchema = Yup.object({
  text_content: Yup.string().required("Teks konten wajib diisi."),
  attachmentUrl_content: Yup.string().optional(),
  type_content: Yup.string().default("All"),
});

export default {
  async getAll(req: IReqUser, res: Response) {
    try {
      const contents = await ContentModel.find()
        .populate("userId", "fullName")
        .sort({ created_at_content: -1 });

      res.status(200).json({
        message: "Berhasil mengambil semua konten",
        data: contents,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data konten",
        error: err.message,
      });
    }
  },

  async create(req: IReqUser, res: Response) {
    try {
      const { text_content, type_content } = req.body;

      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "User tidak terautentikasi.",
        });
      }
      const attachmentUrl_content = req.file
        ? `/uploads/${req.file.filename}`
        : undefined;

      const newContent = await ContentModel.create({
        text_content,
        attachmentUrl_content,
        type_content,
        created_at_content: new Date(),
        userId,
      });

      return res.status(201).json({
        message: "Konten berhasil dibuat.",
        data: newContent,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan server.",
        error,
      });
    }
  },
};
