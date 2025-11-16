import express from "express";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/");

export default router;
