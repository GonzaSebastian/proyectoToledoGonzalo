import { cartModel } from '../models/cart.model.js'

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
  deleteToCart = async(req) => {
    const cart = await cartModel.findOne({_id: req.params.cid})
    const productsFilter = cart.products.findIndex(i => i.product.toString() == req.params.pid)
    if (cart && productsFilter !== -1) {
      cart.products.splice(productsFilter, 1)
      await cartModel.updateOne({_id: req.params.cid}, cart)
      return cart
    } else {
      return null
    }
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
}