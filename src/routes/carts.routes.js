import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const cartsRouter = Router()
const carts = new cartManager()

cartsRouter.get("/", async (req, res) => {
  try {
    res.status(200).json({ status: 'success', payload: await carts.getCart() })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

cartsRouter.post("/", async (req, res) => {
  try {
    await carts.addCart()
    res.status(200).json({ status: 'success', mesagge: 'Cart created successfully' })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid

  res.status(200).json(await carts.addProductInCart(cartId, productId))
})

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid

  res.status(200).json(await carts.deleteProductInCart(cartId, productId))
})

cartsRouter.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid

  res.status(200).json(await carts.cleanCart(cartId))
})

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    let cartId = req.params.cid
    let productId = req.params.pid
    let newQuantity = req.body.quantity
    const productNewQuant = await carts.updateQuantityProduct(cartId, productId, newQuantity)

    res.status(200).json({status: 'success', payload: productNewQuant})
  } catch(err) {
    res.status(404).json({status: 'error', error: err.message})
  }

})

export default cartsRouter