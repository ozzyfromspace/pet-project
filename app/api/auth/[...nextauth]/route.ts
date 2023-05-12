import {
  mongoClientPromise,
  mongoDBAdapterOptions,
} from "@/features/AuthProvider"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import CustomProvider from "@/app/(authentication)/customProviders"

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(mongoClientPromise, mongoDBAdapterOptions),
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] ?? "no-google-client-id",
      clientSecret:
        process.env["GOOGLE_CLIENT_SECRET"] ?? "no-google-client-secret",
    }),
    CustomProvider.credentialsLogin,
    CustomProvider.credentialsRegister,
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env["JWT_SECRET"],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
