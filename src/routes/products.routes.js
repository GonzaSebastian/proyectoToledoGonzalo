import { Router } from "express";
import productManager from "../controllers/productManager.js";

const productRouter = Router()

const product = new productManager("./src/models/products.json")

productRouter.post("/", async (req, res) => {
  const newProduct = req.body
  const result = await product.addProduct(newProduct)
  const products = await product.getProducts()
  req.io.emit('updateProducts', products) 
  res.json(result)
})

productRouter.get("/", async (req, res) => {
  const getProducts = await product.getProducts()
  res.status(200).json(getProducts)
})

productRouter.get("/:id", async (req, res) => {
  let id = req.params.id

  let productFind = await product.getProductById(id)
  if (!productFind) return res.status(404).send(`Product "${id}" Not Found`)
  res.status(200).send(await product.getProductById(id))
})

productRouter.put("/:id", async (req, res) => {
  let id = req.params.id
  let update = req.body

  let productFind = await product.updateProduct(id)
  if (!productFind) return res.status(404).send(`Product "${id}" Not Found`)
  res.status(200).send(await product.updateProduct(id, update))
})

productRouter.delete("/:pid", async (req, res) => {
  let id = req.params.pid
  let productFind = await product.deleteProduct(id)
  if (!productFind) return res.status(404).send(`Product "${id}" Not Found`)
  req.io.emit('updateProducts', productFind) 
  res.status(200).json(await product.deleteProduct(id))
})

export default productRouter