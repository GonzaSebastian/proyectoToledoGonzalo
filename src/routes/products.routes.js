import { Router } from "express";
import productManager from "../controllers/productManager.js";

const productRouter = Router()

const product = new productManager("./src/models/products.json")

productRouter.post("/", async (req, res) => {
  let newProduct = req.body

  res.send(await product.addProduct(newProduct))
})

productRouter.get("/", async (req, res) => {
  const getProducts = await product.getProducts()
  res.status(200).send(getProducts)
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

productRouter.delete("/:id", async (req, res) => {
  let id = req.params.id

  let productFind = await product.deleteProduct(id)
  if (!productFind) return res.status(404).send(`Product "${id}" Not Found`)
  res.status(200).send(await product.deleteProduct(id))
})

export default productRouter