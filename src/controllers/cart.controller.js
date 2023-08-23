import { cartModel } from "../dao/models/cart.model.js"

  export const getCart = async() => {
    const carts = await cartModel.find()
    return carts;
  }

  export const getCartById = async(cartId) => {
  const cart = await cartModel.findOne({_id:cartId}).lean().populate('products.product')
    return cart;;
  }

  export const addCart = async() => {
     await cartModel.create({product:[]})
  }

  export const addProductInCart = async (cartId, productId) => {

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

  export const deleteProductInCart = async (cartId, productId) => {
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

  export const cleanCart = async (cartId) => {
    const cart = await cartModel.findOne({_id: cartId})
    cart.products.splice([])
    await cartModel.updateOne({_id: cartId}, cart)
    return cart
  }

  export const updateQuantityProduct = async (cartId, productId, newQuantity) => {
    const cart = await cartModel.findOne({_id: cartId})
    if (!cart) return console.error(err.message)
    const productIndex = cart.products.findIndex(i => i.product.toString() == productId)

    cart.products[productIndex].quantity = newQuantity 
    await cartModel.updateOne({_id: cartId}, cart)
    return cart
  }
