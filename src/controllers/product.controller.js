import { productModel } from "../dao/models/product.model.js";

  export const getProducts = async (req, res) => {
    let page = parseInt(req.query.page) 
    let limit = parseInt(req.query.limit)
    let stock = req.query.stock
    let category = req.query.category
    let sort = req.query.sort

    try {
      if (!page) page = 1
      if (!limit) limit = 10
      if (sort === 'asc') sort = {price: 1}
      if (sort === 'desc') sort = {price: -1}
      const filterOption = {}
      if (stock) filterOption.stock = stock
      if (category) filterOption.category = category
      const productsPaginate = await productModel.paginate(filterOption, {page, limit, sort, lean: true})
      const {docs, ...rest} = productsPaginate
      let products = {docs, ...rest}

      res.status(200).json({ status: 'success', payload: products })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const addProduct = async (req, res) => {
    const product = req.body
    
    try {
      let result = await productModel.create({
        title: product.title,
        description: product.description,
        Category: product.category,
        thumbnail: product.thumbnail,
        price: product.price,
        code: product.code,
        stock: product.stock
      })
      const products = productModel.find().lean().exec()

      req.io.emit('updateProducts', products) 
      res.json({ status: 'success', payload: result })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const deleteProduct = async (req, res) => {
    let id = req.params.pid

    try {
      const deleteProduct = await productModel.deleteOne({_id : id})
      const products = await productModel.find().lean().exec()

      req.io.emit('updateProducts', products) 
      res.status(200).json({ status: 'success', payload: deleteProduct })
    } catch (err) {
      res.status(404).json({ status: 'error', error: err.message })
    }

  }
  
  export const getProductById = async (req, res) => {
    try {
     let productFilter = await productModel.findById(req.params.pid)
     res.status(200).json({status: 'success', payload: productFilter})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const updateProduct = async (req, res) => {
    let id = req.params.pid
    let update = req.body
    try {
      let product = await productModel.updateOne(
        {_id:id}, 
        {
          $push: {thumbnail: update.thumbnail},
          title: update.title,
          description: update.description,
          category: update.category,
          price: update.price,
          code: update.code,
          stock: update.stock
        }, 
      )
      let products = await productModel.find().lean().exec()
      req.io.emit('updateProducts', products) 
      res.status(200).json({ status: 'success', payload: product })
      
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

