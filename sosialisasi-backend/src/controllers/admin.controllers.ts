import { Response } from "express";
import UserModel from "../models/users.models";
import { IReqUser } from "../middlewares/auth.middleware";
import ContentModel from "../models/content.models";

const escapeRegExp = (string: any) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export default {
  async getUserActiveStatusCount(req: IReqUser, res: Response) {
    try {
      const activeUserCount = await UserModel.countDocuments({
        role: "user",
        isActive: true,
      });
      const inactiveUserCount = await UserModel.countDocuments({
        role: "user",
        isActive: false,
      });
      const mahasiswaCount = await UserModel.countDocuments({
        role: "user",
        status: "Mahasiswa",
        isActive: true,
      });
      const dosenCount = await UserModel.countDocuments({
        role: "user",
        status: "Dosen",
        isActive: true,
      });
      res.status(200).json({
        message: "User active status count retrieved successfully",
        data: {
          activeUsers: activeUserCount,
          inactiveUsers: inactiveUserCount,
          mahasiswaUsers: mahasiswaCount,
          dosenUsers: dosenCount,
          totalUsers: activeUserCount + inactiveUserCount,
        },
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async getUserContentCount(req: IReqUser, res: Response) {
    try {
      const allUserContentsCount = await ContentModel.countDocuments({
        type_content: "All",
        status_content: true,
      });
      const competitionUserContentsCount = await ContentModel.countDocuments({
        type_content: "Competition",
        status_content: true,
      });
      const projectUserContentsCount = await ContentModel.countDocuments({
        type_content: "Project",
        status_content: true,
      });
      res.status(200).json({
        message: "User active status count retrieved successfully",
        data: {
          allUserContents: allUserContentsCount,
          competitionUserContents: competitionUserContentsCount,
          projectUserContents: projectUserContentsCount,
          totalContent:
            allUserContentsCount +
            competitionUserContentsCount +
            projectUserContentsCount,
        },
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async getUsers(req: IReqUser, res: Response) {
    try {
      const { isActive, status } = req.query;
      const filter: any = {
        role: "user",
      };
      if (isActive !== undefined) {
        filter.isActive = isActive === "true";
      }
      if (status) {
        const statusString = status as string;
        const escapedStatus = escapeRegExp(statusString);
        filter.status = {
          $regex: `^${escapedStatus}$`,
          $options: "i",
        };
      }
      const users = await UserModel.find(filter).sort({ createdAt: -1 }).lean();

      res.status(200).json({
        message: "Berhasil mengambil semua data pengguna",
        data: users,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data konten",
        error: err.message,
      });
    }
  },

  async toggleUsersStatus(req: IReqUser, res: Response) {
    try {
      const { userId } = req.params;
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId, role: "user" },
        [{ $set: { isActive: { $not: "$isActive" } } }],
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
          data: null,
        });
      }
      res.status(200).json({
        message: `User status changes to ${updatedUser.isActive} successfully`,
        data: updatedUser,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data konten",
        error: err.message,
      });
    }
  },
};
