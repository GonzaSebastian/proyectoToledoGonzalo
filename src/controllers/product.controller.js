import { ProductService, UserService } from "../services/index.js";
import CustomError from "../services/errors/custom_error.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import EError from "../services/errors/enums.js";
import { sendDeletedProdPremium } from "../services/nodemailer.js";

  export const getProductsController = async (req, res) => {
    const result = await ProductService.getAllPaginate(req, res)
    res.status(result.status).json(result.response)

  }

  export const addProductController = async (req, res, next) => {
    try {
      const data = req.body
      if(req.session?.passport?.user) {
        const user = await UserService.getUserById(req.session?.passport?.user)
        data.owner = user.email 
      }
      if(!data.title || !data.category || !data.price || !data.code || !data.stock) {
        CustomError.createError({
          name: "Product creation error",
          cause: generateProductErrorInfo(data),
          message: "Complete all fields",
          code: EError.INVALID_TYPE_ERROR
        })
      } 

      let result = await ProductService.create(data)
      const products = await ProductService.getAllPaginate(req, res)
    
      req.io.emit('updateProducts', products.response) 
      res.json({ status: 'success', payload: result })
    } catch(err) {
      next(err.message)
    }

  }

  export const deleteProductController = async (req, res) => {

    try {
      const product = await ProductService.getById(req.params.pid)
      const user = await UserService.getUserFindOne({email: product.owner})
      if (user.role === 'premium') {
        sendDeletedProdPremium(req, user)
      } 


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

