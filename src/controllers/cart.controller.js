import { cartModel } from "../dao/models/cart.model.js"

  export const getCart = async (req, res) => {
    try {
      const carts = await cartModel.find()
      res.status(200).json({ status: 'success', payload: carts })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const getCartById = async(cartId) => {
  const cart = await cartModel.findOne({_id:cartId}).lean().populate('products.product')
    return cart;
  }

  export const addCart = async (req, res) => {
    try {
      await cartModel.create({product:[]})
      res.status(200).json({ status: 'success', mesagge: 'Cart created successfully' })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const addProductInCart = async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    try {
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

      res.status(200).json({ status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  
  }

  export const deleteProductInCart = async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    try {
      const cart = await cartModel.findOne({_id: cartId})
      const productsFilter = cart.products.findIndex(i => i.product.toString() == productId)
      if (cart && productsFilter !== -1) {
        cart.products.splice(productsFilter, 1)
        await cartModel.updateOne({_id: cartId}, cart)
      } else {
        return "Cart or product not found"
      }

      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const cleanCart = async (req, res) => {
    let cartId = req.params.cid
    try {
      const cart = await cartModel.findOne({_id: cartId})
      cart.products.splice([])
      await cartModel.updateOne({_id: cartId}, cart)

      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const updateQuantityProduct = async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    let newQuantity = req.body.quantity

    try {
      const cart = await cartModel.findOne({_id: cartId})
      if (!cart) return console.error(err.message)
      const productIndex = cart.products.findIndex(i => i.product.toString() == productId)

      cart.products[productIndex].quantity = newQuantity 
      await cartModel.updateOne({_id: cartId}, cart)

      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({status: 'error', error: err.message})
    }
  
  }