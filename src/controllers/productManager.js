import { productModel } from "../models/product.model.js";

export default class productManager {
  getProducts = async (page, limit, stock, category, sort) => {
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
    return products
  }

  addProduct = async (product) => {
    let productCreate = await productModel.create({
      title: product.title,
      description: product.description,
      Category: product.category,
      thumbnail: product.thumbnail,
      price: product.price,
      code: product.code,
      stock: product.stock
    })
    return productCreate
  }

  deleteProduct = async(id) => {
    const deleteProduct = await productModel.deleteOne({_id : id})
    const products = await this.getProducts()
    if (deleteProduct.deletedCount == 0) return undefined
    else return products 
  }
  getProductById = async(id) => {
    let productFilter = await productModel.findById(id)
    if (productFilter == null) return "Id not found";
    return productFilter
  }
  updateProduct = async(id, update) => {
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
    if (product.modifiedCount == 0) return undefined
    else return product
  }
}



