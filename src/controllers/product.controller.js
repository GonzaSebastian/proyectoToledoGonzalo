import { ProductService } from "../services/index.js";

  export const getProductsController = async (req, res) => {
    const result = await ProductService.getAllPaginate(req, res)
    res.status(result.status).json(result.response)

  }

  export const addProductController = async (req, res) => {
    try {
      let result = await ProductService.create(req.body)
      const products = await ProductService.getAllPaginate(req, res)

      req.io.emit('updateProducts', products.response) 
      res.json({ status: 'success', payload: result })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const deleteProductController = async (req, res) => {
    try {
      const deleteProduct = await ProductService.delete(req.params.pid)
      const products = await ProductService.getAll()

      req.io.emit('updateProducts', products) 
      res.status(200).json({ status: 'success', payload: deleteProduct })
    } catch (err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }
  
  export const getProductByIdController = async (req, res) => {
    try {
     let productFilter = await ProductService.getById(req.params.pid)
     res.status(200).json({status: 'success', payload: productFilter})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const updateProductController = async (req, res) => {
    try {
      let product = await ProductService.update(req,res)
      let products = await ProductService.getAll()
      req.io.emit('updateProducts', products) 
      res.status(200).json({ status: 'success', payload: product })
      
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

