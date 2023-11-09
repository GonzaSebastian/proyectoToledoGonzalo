export default class UserRepository {
  constructor(dao) {
    this.dao = dao
  }

  getUsers = async(user) => await this.dao.getUsers(user)
  getUserById = async(id) => await this.dao.getUserById(id)
  getUserFindOne = async(id) => await this.dao.getUserFindOne(id)
  createUser = async(user) => await this.dao.createUser(user)
  findAndUpdate = async(uid, user) => await this.dao.findAndUpdate(uid, user)
  deleteUser = async(id) => await this.dao.deleteUser(id)
}