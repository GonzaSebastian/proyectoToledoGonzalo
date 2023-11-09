import UserModel from "../models/user.model.js";

export default class userDAO {
  getUsers = async(user) => await UserModel.find(user).lean().exec()
  getUserById = async(id) => await UserModel.findById(id).lean().exec()
  getUserFindOne = async(id) => await UserModel.findOne(id)
  createUser = async(user) => await UserModel.create(user)
  findAndUpdate = async(uid, user) => await UserModel.findByIdAndUpdate(uid, user)
  deleteUser = async(id) => await UserModel.findByIdAndDelete(id)
}