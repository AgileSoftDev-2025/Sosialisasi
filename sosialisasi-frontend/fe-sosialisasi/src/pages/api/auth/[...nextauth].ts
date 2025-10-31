import environment from "@/config/environment";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";
import NextAuth from "next-auth";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const result = await authServices.login({
          email,
          password,
        });
        const accessToken = result.data.data;
        const me = await authServices.getProfileWithToken(accessToken);
        const userApi = me.data.data;

        if (
          accessToken &&
          result.status === 200 &&
          userApi._id &&
          me.status === 200
        ) {
          const user: UserExtended = {
            id: userApi._id,
            name: userApi.fullName,
            email: userApi.email,
            image: userApi.profilePicture,
            role: userApi.role,
            jurusan: userApi.jurusan,
            universitas: userApi.universitas,
            status: userApi.status,
            accessToken: accessToken,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
