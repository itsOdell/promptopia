import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "An account is already registered with this email"],
    required: [true, "Email is required"]
  },
  username: {
    type: String,
    required: [true, "A username is requried"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique"
    ]
  },
  image: {
    type: String
  }
})

/* 
Since Next.js is serverless, we connect and discconnect to DB continously. 
The code below basically checks if a model exists and creates it if it doesnt. 
Without this checking, the User model will be redefined every time we connect to DB 
*/
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
export default UserModel
