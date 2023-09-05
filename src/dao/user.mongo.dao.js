import UserModel from "../models/user.model.js";

export default class userDAO {
  // getUser = async(id) => {
  //   const user =  await UserModel.findById(id).lean().exec()
  //   const { first_name, last_name, age, email, cart } = user
  //   const userPublic = {first_name, last_name, age, email, cart}
  //   return userPublic
  // } 
  getUser = async(id) => await UserModel.findById(id).lean().exec()
  getUserFindOne = async(id) => await UserModel.findOne(id)
  createUser = async(user) => await UserModel.create(user)
}