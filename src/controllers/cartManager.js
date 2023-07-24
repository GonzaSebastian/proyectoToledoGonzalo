import productManager from "./productManager.js"
import { cartModel } from "../models/cart.model.js"

const products = new productManager("./src/models/products.json")

export default class cartManager {

  getCart = async() => {
    const carts = await cartModel.find()
    return carts;
  }

  addCart = async() => {
     await cartModel.create({product:[]})
  }

  addProductInCart = async (cartId, productId) => {

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


    return cart;
  }

  deleteProductInCart = async (cartId, productId) => {
    const cart = await cartModel.findOne({_id: cartId})
    const productsFilter = cart.products.findIndex(i => i.product.toString() == productId)
    if (cart && productsFilter !== -1) {
      cart.products.splice(productsFilter, 1)
      await cartModel.updateOne({_id: cartId}, cart)
      return cart
    } else {
      return "Cart or product not found"
    }
  }

  cleanCart = async (cartId) => {
    const cart = await cartModel.findOne({_id: cartId})
    cart.products.splice([])
    await cartModel.updateOne({_id: cartId}, cart)
    return cart
  }

  updateQuantityProduct = async (cartId, productId, newQuantity) => {
    const cart = await cartModel.findOne({_id: cartId})
    if (!cart) return console.error(err.message)
    const productIndex = cart.products.findIndex(i => i.product.toString() == productId)

    cart.products[productIndex].quantity = newQuantity 
    await cartModel.updateOne({_id: cartId}, cart)
    return cart
  }
  // getCart = async() => JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

  // findCart = async(id) => {
  //   let content = await this.getCart()
  //   return content.find(i => i.id === id)
  // }
  


  // addCart = async() => {
  //   let cartsConcat = [{products : []}]
  //   await this.writeCarts(cartsConcat)

  //   return cartsConcat
  // }

  // getCartById = async(id) => {
  //   let cartById = await this.findCart(id)
  //   if (cartById) return cartById
  //     return undefined
  // }


}