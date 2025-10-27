import express from "express";
import authControllers from "../controllers/auth.controllers";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    data: null,
  });
});

router.post("/auth/register", authControllers.register);
router.post("/auth/login", authControllers.login);
router.get("/auth/me", authMiddleware, authControllers.me);
router.post("/auth/activation", authControllers.activation);

export default router;
