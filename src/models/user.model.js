import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  age: { type: Number, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  role: { type: String, default: 'user' },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts", _id: false },
  documents: {type: [{name: { type: String }, reference: { type: String }}], default: []},
  status: {type: Boolean, default: false},
  profilePicture: {type: String},
  last_connection: {type: Date}
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model("users", userSchema)

export default UserModel