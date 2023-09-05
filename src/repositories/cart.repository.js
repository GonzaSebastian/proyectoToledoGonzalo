export default class CartRepository {
  constructor(dao) {
    this.dao = dao
  }

  getAll = async() => await this.dao.getAll()
  getById = async(id) => await this.dao.getById(id)
  create = async(req) => await this.dao.create(req)
  addToCart = async(req) => await this.dao.addToCart(req)
  updateCartUser = async(user) => await this.dao.updateCartUser(user)
  deleteToCart = async(req) => await this.dao.deleteToCart(req)
  emptyCart = async(id) => await this.dao.emptyCart(id)
  updateQuantity = async(req) => await this.dao.updateQuantity(req)
  createPurchase = async(ticket) => await this.dao.createPurchase(ticket)
}