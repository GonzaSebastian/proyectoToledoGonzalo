import messageModel from '../models/chat.model.js'

export default class chatDAO {
  getMessages = async () => await messageModel.find().lean().exec()
}