import { MongoDBAdapterOptions } from "@next-auth/mongodb-adapter"

const mongoDBAdapterOptions: MongoDBAdapterOptions = {
  databaseName: "pet-journal-database",
}

export default mongoDBAdapterOptions
