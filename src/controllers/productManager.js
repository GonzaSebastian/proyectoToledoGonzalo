import fs from "fs"
import {nanoid} from "nanoid"

export default class productManager {

  constructor(path) {
    this.path = path
  }
  getProducts = async() => JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
  
  findProduct = async(id) => {
    let content = await this.getProducts()
    return content.find(i => i.id === id)
  }

  writeProducts = async(product) => {
    await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'))
  }

  getProductById = async(id) => {
    let productFilter = await this.findProduct(id)
    if (productFilter) return productFilter
      return `ID "${id}" Not Found`
  }

  updateProduct = async(id, update) => {
    let product = await this.findProduct(id)

    if (!product) return `ID "${id}" Not Found`
    await this.deleteProduct(id)
    let productsOld = await this.getProducts()
    let productUpdate = [{...update, id : id}, ...productsOld]
    await this.writeProducts(productUpdate)
    return productUpdate;
    
  }

  deleteProduct = async(id) => {
    let content = await this.getProducts()
    let product = content.some(i => i.id === id)

    if (product) {
      let productsUpdate = content.filter(i => i.id != id)
      await this.writeProducts(productsUpdate)
      return productsUpdate
    } else {
      return `ID "${id}" Not Found`
    }

    
  }
  
  addProduct = async(product) => {
    let productsOld = await this.getProducts()
    product.id = nanoid(10)
    let productAdd = [...productsOld, product]
    await this.writeProducts(productAdd)

    return "Product create"
  }
}