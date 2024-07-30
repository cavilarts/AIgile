import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/google";
import { createUser, getUserByEmail } from "../db";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/logout",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (user && user.email) {
          const foundUser = await getUserByEmail(user?.email);
          if (foundUser) return true;

          await createUser({
            email: user.email,
            name: user.name ?? "",
            profileImage: user.image,
          });

          return true;
        } else {
          console.error("signIn error", user);
          return false;
        }
      } catch (e) {
        console.error("signIn error", e);
        return false;
      }
    },
  },
};
