import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  age: { type: Number, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  role: { type: String, default: 'user' },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts", _id: false }
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model("users", userSchema)

export default UserModel