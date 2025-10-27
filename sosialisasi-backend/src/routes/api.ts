import express from "express";
import authRoutes from "./auth.routes";
import uploadRoutes from "./upload.routes";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);

export default router;
