import { Router } from "express";
import productManager from "../controllers/productManager.js";

const productRouter = Router()

let product = new productManager()

productRouter.get('/', async (req, res) => {
  try {
    const products = await product.getProducts()
    const {docs, ...rest} = products
    res.status(200).json({ status: 'success', payload: docs, ...rest })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

productRouter.get("/:pid", async (req, res) => {
  try {
   let id = req.params.pid
   let productFind = await product.getProductById(id)
   res.status(200).json(productFind)
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

productRouter.post("/", async (req, res) => {
  try {
    const productCreate = req.body
    const result = await product.addProduct(productCreate)
    const products = await product.getProducts()

    req.io.emit('updateProducts', products) 
    res.json({ status: 'success', payload: result })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

productRouter.delete("/:pid", async (req, res) => {
  try {
    let id = req.params.pid
    let productFind = await product.deleteProduct(id)
    const products = await product.getProducts()
    req.io.emit('updateProducts', products) 
    res.status(200).json({ status: 'success', payload: productFind })
  } catch (err) {
    res.status(404).json({ status: 'error', error: err.message })
  }

})

productRouter.put("/:pid", async (req, res) => {
  try {
    let id = req.params.pid
    let update = req.body
    let productFind = await product.updateProduct(id, update)
    let products = await product.getProducts()
    req.io.emit('updateProducts', products) 
    res.status(200).json({ status: 'success', payload: products })
    
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

export default productRouter