import {
  mongoClientPromise,
  mongoDBAdapterOptions,
} from "@/features/AuthProvider"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
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
  ],
})
