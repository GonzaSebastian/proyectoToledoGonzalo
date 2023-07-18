import { productModel } from "../models/product.model.js";

export default class productManager {
  getProducts = async () => await productModel.find().lean().sort({_id:-1})

  addProduct = async (product) => {
    let productCreate = await productModel.create({
      title: product.title,
      description: product.description,
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
        price: update.price,
        code: update.code,
        stock: update.stock
      },
      
    )
    if (product.modifiedCount == 0) return undefined
    else return product
  }
}



