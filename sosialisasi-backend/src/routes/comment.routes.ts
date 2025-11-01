import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import commentControllers from "../controllers/comment.controllers";

const router = express.Router();

router.post("/:id", authMiddleware, commentControllers.toggleComment);
router.get("/:id", authMiddleware, commentControllers.getCommentsByContentId);

export default router;
