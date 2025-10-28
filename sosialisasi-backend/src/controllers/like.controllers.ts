import { Request, Response } from "express";
import LikeModel from "../models/like.models";

interface IReqUser extends Request {
  user?: {
    _id: string;
  };
}

async function toggleLike(req: IReqUser, res: Response) {
  try {
    const contentId = req.params.id?.trim();
    const userId = req.query.userId as string;

    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ message: "User ID atau Content ID tidak ada" });
    }

    const existingLike = await LikeModel.findOne({
      id_user: userId,
      id_content: contentId,
    });

    if (existingLike) {
      await LikeModel.deleteOne({ _id: existingLike._id });
      return res.status(200).json({ message: "Unliked", action: "unlike" });
    } else {
      const newLike = await LikeModel.create({
        id_user: userId,
        id_content: contentId,
        created_at_like: new Date(),
      });
      return res
        .status(201)
        .json({ message: "Liked", action: "like", data: newLike });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getLikesByContentId(req: IReqUser, res: Response) {
  try {
    const contentId = req.params.id?.trim();

    if (!contentId) {
      return res.status(400).json({ message: "Content ID tidak ada" });
    }

    const likes = await LikeModel.find({ id_content: contentId });

    return res.status(200).json({
      message: "Berhasil mengambil like",
      data: likes,
      totalLikes: likes.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default { toggleLike, getLikesByContentId };
