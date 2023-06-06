import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const cartsRouter = Router()
const carts = new cartManager("./src/models/carts.json")

cartsRouter.get("/", async (req, res) => {
  res.send(await carts.getCart())
})

cartsRouter.get("/:id", async (req, res) => {
  let id = req.params.id
  res.send(await carts.getCartById(id))
})

cartsRouter.post("/", async (req, res) => {
  res.send(await carts.addCart())
})

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid

  res.send(await carts.addProductInCart(cartId, productId))
})

export default cartsRouter