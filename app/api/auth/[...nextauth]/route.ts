import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = "Google User";
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
  ],
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
const handler = NextAuth(options);

export { handler as GET, handler as POST };
