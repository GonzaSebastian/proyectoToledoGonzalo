import { productModel } from "../models/product.model.js";

export default class productDAO {
  getAll = async() => await productModel.find()
  getAllPaginate = async(req, res) => {
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

      products.prevLink = products.hasPrevPage ? `?page=${products.prevPage}` : ''
      products.nextLink = products.hasNextPage ? `?page=${products.nextPage}` : ''
      
      return {status: 200, response: products}
    } catch(err) {
      return {status: 404, response: err}
    }
  }

  getById = async(id) => await productModel.findById(id)

  create = async(data) => {
    await productModel.create({
      title: data.title,
      description: data.description,
      category: data.category,
      thumbnail: data.thumbnail,
      price: data.price,
      code: data.code,
      stock: data.stock      
    })
  }

  update = async(req) => {
    let id = req.params.pid
    let data = req.body

    const dataUpdate = await productModel.updateOne({_id : id}, {
      $push: {thumbnail: data.thumbnail},
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      code: data.code,
      stock: data.stock
    })
    return dataUpdate
  }
  updateStock = async(id, data) => {
    const dataUpdate = await productModel.updateOne({_id : id}, {
      stock: data.stock
    })
    return dataUpdate
  }
  delete = async(id) => await productModel.deleteOne({_id : id})
}