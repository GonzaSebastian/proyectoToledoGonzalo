import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  email: String,
  password: String,
  role: String
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model("users", userSchema)

export default UserModel