import "next-auth";
import { UserExtended } from "./types/Auth";

declare module "next-auth" {
  interface Session {
    user: UserExtended;
    accessToken?: string;
  }

  interface User extends UserExtended {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: UserExtended;
  }
}
