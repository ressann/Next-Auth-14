import dbConnect from "@/lib/mongodb/dbConnect";
import UserModel from "@/models/UserModel";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { signOut } from "next-auth/react";

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = "user";
        if (profile.email === "laressann2001@gmail.com") userRole = "admin";
        return {
          ...profile,
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: Record<"username" | "password", string> | undefined,
        req: any
      ): Promise<any> => {
        await dbConnect();
        const user = await UserModel.findOne({
          username: credentials?.username,
        });
        if (!user) throw new Error("User name or password is not correct");
        // Method to compare a candidate password with the user's hashed password
        const checkPass = await bcrypt.compareSync(
          credentials?.password as string,
          user.password
        );
        if (!checkPass) throw new Error("Password is not correct");
        const { password, ...userWithOutPass } = user._doc;
        return userWithOutPass;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // user argument is the profile with the added properties from the profile callback
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Include the role and id in the session
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
