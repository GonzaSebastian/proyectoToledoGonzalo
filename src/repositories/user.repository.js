export default class UserRepository {
  constructor(dao) {
    this.dao = dao
  }

  getUser = async(id) => await this.dao.getUser(id)
  getUserFindOne = async(id) => await this.dao.getUserFindOne(id)
  createUser = async(user) => await this.dao.createUser(user)
}