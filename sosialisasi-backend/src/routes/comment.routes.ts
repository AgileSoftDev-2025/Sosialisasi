import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import commentControllers from "../controllers/comment.controllers";

const router = express.Router();

router.post("/comment/:id", authMiddleware, commentControllers.toggleComment);

router.get(
  "/comment/:id",
  authMiddleware,
  commentControllers.getCommentsByContentId
);

export default router;
