import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: { type: String, require: true },
  message: { type: String, require: true }
})

mongoose.set('strictQuery', false)

const messageModel = mongoose.model('messages', messageSchema)

export default messageModel