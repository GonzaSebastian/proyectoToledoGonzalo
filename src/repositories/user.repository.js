export default class UserRepository {
  constructor(dao) {
    this.dao = dao
  }

  getUser = async(id) => await this.dao.getUser(id)
}