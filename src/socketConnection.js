import { io } from './app.js'
import messageModel from './models/chat.model.js'
import logger from "./logger.js"


export const socketConnection = () => {
  io.on('connection', async socket  => {
    logger.info("New client connected");
    socket.on('productList', data => {
      io.emit('updateProducts', data.docs)
    })

    let messages = await messageModel.find()
      
    socket.broadcast.emit("alert");
    socket.emit("logs", messages);
    socket.on("message", async (data) => {
      messages.push(data);
      await messageModel.create(data)
      io.emit("logs", messages)
    })
  })
}