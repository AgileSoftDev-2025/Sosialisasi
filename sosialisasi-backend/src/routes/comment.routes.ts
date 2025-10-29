import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import commentControllers from "../controllers/comment.controllers";

const router = express.Router();

router.post("/comment/:id", authMiddleware, commentControllers.toggleComment);
router.delete(
  "/comment/:CommentId",
  authMiddleware,
  commentControllers.deleteComment
);
router.get(
  "/comment/:id",
  authMiddleware,
  commentControllers.getCommentsByContentId
);

export default router;
