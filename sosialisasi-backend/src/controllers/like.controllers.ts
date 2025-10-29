import { Response } from "express";
import { IReqUser } from "../middlewares/auth.middleware";
import LikeModel from "../models/like.models";
import ContentModel from "../models/content.models";

async function toggleLike(req: IReqUser, res: Response) {
  try {
    const contentId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User tidak terautentikasi" });
    }

    const existingLike = await LikeModel.findOne({
      id_user: userId,
      id_content: contentId,
    });

    if (existingLike) {
      await LikeModel.findByIdAndDelete(existingLike._id);
      await ContentModel.findByIdAndUpdate(contentId, {
        $pull: { likes: userId },
      });
      return res
        .status(200)
        .json({ message: "Berhasil unlike konten.", action: "unliked" });
    } else {
      await LikeModel.create({
        id_user: userId,
        id_content: contentId,
        created_at_like: new Date(),
      });
      await ContentModel.findByIdAndUpdate(contentId, {
        $push: { likes: userId },
      });
      return res
        .status(200)
        .json({ message: "Berhasil like konten", action: "liked" });
    }
  } catch (error) {
    console.error("Toggle like error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default { toggleLike };
