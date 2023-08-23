import { Router } from "express";
import {getCart, addCart, addProductInCart, deleteProductInCart, cleanCart, updateQuantityProduct} from "../controllers/cart.controller.js";

const cartsRouter = Router()

cartsRouter.get("/", async (req, res) => {
  try {
    res.status(200).json({ status: 'success', payload: await getCart() })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

cartsRouter.post("/", async (req, res) => {
  try {
    await addCart()
    res.status(200).json({ status: 'success', mesagge: 'Cart created successfully' })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid

  res.status(200).json(await addProductInCart(cartId, productId))
})

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid

  res.status(200).json(await deleteProductInCart(cartId, productId))
})

cartsRouter.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid

  res.status(200).json(await cleanCart(cartId))
})

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    let cartId = req.params.cid
    let productId = req.params.pid
    let newQuantity = req.body.quantity
    const productNewQuant = await updateQuantityProduct(cartId, productId, newQuantity)

    res.status(200).json({status: 'success', payload: productNewQuant})
  } catch(err) {
    res.status(404).json({status: 'error', error: err.message})
  }

})

export default cartsRouter