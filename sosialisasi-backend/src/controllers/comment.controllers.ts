import { Request, Response } from "express";
import CommentModel from "../models/comment.models";
import { IReqUser } from "../middlewares/auth.middleware";
import UserModel from "../models/users.models";

async function toggleComment(req: IReqUser, res: Response) {
  try {
    const contentId = req.params.id?.trim();
    const userId = req.user?.id;
    const textComment = (req.body.text_comment || "").trim();

    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ message: "User ID atau Content ID tidak ada" });
    }

    const existingComment = await CommentModel.findOne({
      id_user: userId,
      id_content: contentId,
      text_comment: textComment,
    });

    if (existingComment) {
      await CommentModel.deleteOne({ _id: existingComment._id });

      const ContentModel = (await import("../models/content.models")).default;
      await ContentModel.updateOne(
        { _id: contentId },
        { $pull: { comments: existingComment._id } }
      );

      return res
        .status(200)
        .json({ message: "Comment deleted", action: "delete" });
    } else {
      if (!textComment) {
        return res
          .status(400)
          .json({ message: "Teks komentar tidak boleh kosong" });
      }

      const newComment = await CommentModel.create({
        id_user: userId,
        id_content: contentId,
        text_comment: textComment,
        created_at_comment: new Date(),
      });

      const ContentModel = (await import("../models/content.models")).default;
      await ContentModel.updateOne(
        { _id: contentId },
        { $push: { comments: newComment._id } }
      );

      return res
        .status(201)
        .json({ message: "Comment added", action: "add", data: newComment });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getCommentsByContentId(req: IReqUser, res: Response) {
  try {
    const contentId = req.params.id?.trim();

    if (!contentId) {
      return res.status(400).json({ message: "Content ID tidak ada" });
    }

    const comments = await CommentModel.find({ id_content: contentId })
      .populate("id_user", "fullName")
      .sort({ created_at_comment: -1 });

    return res.status(200).json({
      message: "Berhasil mengambil komentar",
      data: comments,
      totalComments: comments.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default { toggleComment, getCommentsByContentId };
