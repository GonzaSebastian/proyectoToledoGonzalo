export default class CartRepository {
  constructor(dao) {
    this.dao = dao
  }

  getAll = async() => await this.dao.getAll()
  getById = async(id) => await this.dao.getById(id)
  create = async() => await this.dao.create()
  addToCart = async(req) => await this.dao.addToCart(req)
  deleteToCart = async(req) => await this.dao.deleteToCart(req)
  emptyCart = async(id) => await this.dao.emptyCart(id)
  updateQuantity = async(req) => await this.dao.updateQuantity(req)
}