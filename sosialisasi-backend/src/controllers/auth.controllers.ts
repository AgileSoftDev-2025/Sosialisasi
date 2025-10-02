import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/users.models";

type TRegister = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  email: string;
  password: string;
};

const registerValidateSchema = Yup.object({
  fullname: Yup.string().required(),
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
    const { fullname, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate({
        fullname,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        fullname,
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
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
