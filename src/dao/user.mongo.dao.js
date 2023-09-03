import UserModel from "../models/user.model.js";

export default class userDAO {
  getUser = async(id) => await UserModel.findById(id).lean().exec()
}