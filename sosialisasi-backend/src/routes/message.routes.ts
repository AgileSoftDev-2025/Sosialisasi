import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import messageControllers from "../controllers/message.controllers";

const router = express.Router();

router.get("/:id", authMiddleware, messageControllers.getMessageById);
router.post("/:id", authMiddleware, messageControllers.createMessage);

export default router;
