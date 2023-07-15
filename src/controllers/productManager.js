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
    let product = await productModel.updateOne({_id:id}, update)
    if (product.modifiedCount == 0) return undefined
    else return product
  //   let propUpdate = {...update}
  //   let productNew = {...product, ...update}
  //   if (propUpdate.thumbnail) {
  //     let thumbnailProp = propUpdate.thumbnail
  //     product.thumbnail.push(thumbnailProp)
  //     productNew.thumbnail = product.thumbnail
  //   }
  //   if (!product) return undefined
  //   await this.deleteProduct(id)
  //   let productsOld = await this.getProducts()
  //   let productsUpdate = [{...productNew, id : id}, ...productsOld]
  //   return productsUpdate;
  }
}



// export default class productManager {

//   constructor(path) {
//     this.path = path
//   }
//   getProducts = async() => JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
  
//   findProduct = async(id) => {
//     let content = await this.getProducts()
//     return content.find(i => i.id === id)
//   }

//   writeProducts = async(product) => {
//     await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'))
//   }

//   getProductById = async(id) => {
//     let productFilter = await this.findProduct(id)
//     if (productFilter) return productFilter
//       return undefined
//   }




//   }
  

// }