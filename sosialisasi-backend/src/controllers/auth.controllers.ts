import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/users.models";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";

type TRegister = {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  email: string;
  password: string;
};

const registerValidateSchema = Yup.object({
  userName: Yup.string().required(),
  fullName: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string()
    .required()
    .min(6, "Password minimal 6 karakter")
    .test(
      "at-least-one-uppercase-letter",
      "Password setidaknya memiliki 1 huruf kapital",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      }
    )
    .test(
      "at-least-one-number",
      "Password setidaknya memiliki 1 angka",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[0-9])/;
        return regex.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password tidak sesuai"),
});

export default {
  async register(req: Request, res: Response) {
    const { userName, fullName, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate({
        userName,
        fullName,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        userName,
        fullName,
        email,
        password,
      });

      res.status(200).json({
        message: "Registrasi Berhasil Dilakukan",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body as unknown as TLogin;
    try {
      const user = await UserModel.findOne({
        email: email,
        isActive: true,
      });

      if (!user) {
        return res.status(403).json({
          message: "Pengguna tidak ditemukan",
          data: null,
        });
      }

      const validatePassword: boolean = encrypt(password) === user.password;

      if (!validatePassword) {
        return res.status(403).json({
          message: "User not found",
          data: null,
        });
      }
      const token = generateToken({
        id: user._id,
        role: user.role,
      });

      res.status(200).json({
        message: "Login success",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id);

      res.status(200).json({
        message: "Success get user profile",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };
      const user = await UserModel.findOneAndUpdate(
        {
          activationCode: code,
        },
        {
          isActive: true,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: "Account activated successfully",
        data: user,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
