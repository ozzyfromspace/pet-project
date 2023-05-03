import { mongoClientPromise } from "@/features/AuthProvider"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb"
import CredentialsProvider from "next-auth/providers/credentials"

type MongoUser = {
  id: ObjectId
  email: string
  passwordHash: string
  name: string
  image: string
  emailVerified: null | boolean
}

const credentialsLogin = CredentialsProvider({
  id: "login-credentials",
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "Email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, _) {
    if (!credentials) return null

    const db = (await mongoClientPromise).db(
      process.env["APP_DATABASE"] || "unknown-database"
    )

    const usersCollection = db.collection("users")

    if (!usersCollection) return null

    const user = await usersCollection.findOne<MongoUser>({
      email: credentials.email,
    })

    if (!user) return null

    const cleanUser = {
      id: "login-credentials",
      email: user.email,
      name: user.name,
      image: user.image,
    }

    const isMatch = await bcrypt.compare(
      credentials.password,
      user.passwordHash
    )

    if (isMatch) return cleanUser

    return null
  },
})

const credentialsRegister = CredentialsProvider({
  id: "registration-credentials",
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "Email" },
    password: { label: "Password", type: "password" },
    name: { label: "Name", type: "text", placeholder: "Name" },
  },
  async authorize(credentials, _) {
    if (!credentials) return null

    const db = (await mongoClientPromise).db(
      process.env["APP_DATABASE"] || "unknown-database"
    )

    const usersCollection = db.collection("users")

    if (!usersCollection) return null

    const user = await usersCollection.findOne<MongoUser>({
      email: credentials.email,
    })

    if (user) return null

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(credentials.password, saltRounds)
    const newUser = {
      name: credentials.name,
      email: credentials.email,
      image: "",
      emailVerified: null,
      passwordHash,
    }

    const insertionResult = await usersCollection.insertOne(newUser)
    if (!insertionResult.acknowledged) return null

    const fetchedUser = await usersCollection.findOne<MongoUser>({
      email: credentials.email,
    })

    if (!fetchedUser) return null

    const cleanUser = {
      id: "registration-credentials",
      email: fetchedUser.email,
      name: fetchedUser.name,
      image: fetchedUser.image,
    }

    return cleanUser
  },
})

const CustomProvider = {
  credentialsLogin,
  credentialsRegister,
}

export default CustomProvider
