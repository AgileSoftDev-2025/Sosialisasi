import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  status: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IActivation {
  code: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
  status?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  IRegister,
  ILogin,
  IActivation,
  UserExtended,
  SessionExtended,
  JWTExtended,
};
