import authOptions from "@/app/auth/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Notes: Adding the prisma adapter switches strategy to database which does not work with Google OAuth
