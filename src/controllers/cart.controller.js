import { CartService } from "../services/index.js"

  export const getCartController = async (req, res) => {
    try {
      const carts = await CartService.getAll()
      res.status(200).json({ status: 'success', payload: carts })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const getCartByIdController = async(id) => await CartService.getById(id)

  export const addCartController = async (req, res) => {
    try {
      await CartService.create()
      res.status(200).json({ status: 'success', mesagge: 'Cart created successfully' })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const addProductInCartController = async (req, res) => {
    try {
      const cart = await CartService.addToCart(req)
      res.status(200).json({ status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  
  }

  export const deleteProductInCartController = async (req, res) => {

    try {
      const cart = await CartService.deleteToCart(req)
      
      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const cleanCartController = async (req, res) => {
    try{
      const cart = await CartService.emptyCart(req.params.cid)
      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const updateQuantityProductController = async (req, res) => {
    try{
      const cart = await CartService.updateQuantity(req)

      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({status: 'error', error: err.message})
    }
  
  }