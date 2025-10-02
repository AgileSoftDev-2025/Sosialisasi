import express from "express";
import authControllers from "../controllers/auth.controllers";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    data: null,
  });
});

router.post("/auth/register", authControllers.register);
export default router;
