import express from "express";
import adminControllers from "../controllers/admin.controllers";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/userstatus-count",
  authMiddleware,
  adminControllers.getUserActiveStatusCount
);

router.get(
  "/usercontent-count",
  authMiddleware,
  adminControllers.getUserContentCount
);

router.get("/users", authMiddleware, adminControllers.getUsers);

router.patch(
  "/users/:userId/toggle-status",
  authMiddleware,
  adminControllers.toggleUsersStatus
);

export default router;
