import mongoose from "mongoose"

let isConnected = false

export default async function connectToDB() {
  mongoose.set("strictQuery", true)
  if (isConnected) {
    console.log("MongoDB is already connected")
    return
  }
  try {
    await mongoose.connect(String(process.env.MONGODB_URI), {
      dbName: "promptopia"
    })
    isConnected = true
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error(error)
  }
}
