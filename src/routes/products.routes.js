import { Router } from "express";
import {getProducts, getProductById, deleteProduct, addProduct} from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.get('/', async (req, res) => {
  try {
    const products = await getProducts()
    const {docs, ...rest} = products
    res.status(200).json({ status: 'success', payload: docs, ...rest })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

productRouter.get("/:pid", async (req, res) => {
  try {
   let id = req.params.pid
   let productFind = await getProductById(id)
   res.status(200).json(productFind)
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

productRouter.post("/", async (req, res) => {
  try {
    const productCreate = req.body
    const result = await addProduct(productCreate)
    const products = await getProducts()

    req.io.emit('updateProducts', products) 
    res.json({ status: 'success', payload: result })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
})

productRouter.delete("/:pid", async (req, res) => {
  try {
    let id = req.params.pid
    let productFind = await deleteProduct(id)
    const products = await getProducts()
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