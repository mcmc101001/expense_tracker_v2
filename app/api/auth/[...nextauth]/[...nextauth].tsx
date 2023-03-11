import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../prisma/prisma"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: '646131761398-0obg7bq0oiaurpov1eb1436r27amfks7.apps.googleusercontent.com',
      clientSecret: 'process.env.GOOGLE_CLIENT_SECRET',
    }),
  ],
  session: {
    strategy: "jwt",
  },
})