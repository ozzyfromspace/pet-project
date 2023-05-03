import { MongoDBAdapterOptions } from "@next-auth/mongodb-adapter"

const mongoDBAdapterOptions: MongoDBAdapterOptions = {
  databaseName: process.env["APP_DATABASE"] || "unknown-database",
}

export default mongoDBAdapterOptions
