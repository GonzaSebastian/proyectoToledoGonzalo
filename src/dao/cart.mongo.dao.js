import { cartModel } from '../models/cart.model.js'
import ticketModel from '../models/ticket.model.js'

export default class cartDAO {
  getAll = async() => await cartModel.find()
  getById = async(id) => await cartModel.findOne({_id:id}).lean().populate('products.product')
  create = async() => await cartModel.create({product:[]})
  addToCart = async(req) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    const cart = await cartModel.findOne({_id: cartId})

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() == productId
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await cartModel.updateOne({_id: cartId}, cart)

    return cart
  }
  updateCartUser = async(user) => {
    const cartId = user.cart
    await cartModel.updateOne({_id : cartId}, {user: user._id})
  }
  emptyCart = async(id) => {
    const cart = await cartModel.findOne({_id: id})
    cart.products.splice([])
    await cartModel.updateOne({_id: id}, cart)

    return cart
  }
  updateQuantity = async(req) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    let newQuantity = req.body.quantity

    const cart = await cartModel.findOne({_id: cartId})
    if (!cart) return console.error(err.message)
    const productIndex = cart.products.findIndex(i => i.product.toString() == productId)
    cart.products[productIndex].quantity = newQuantity 
    await cartModel.updateOne({_id: cartId}, cart)

    return cart
  }
  createPurchase = async (ticket) => await ticketModel.create(ticket)
}