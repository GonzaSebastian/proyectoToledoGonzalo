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
      return undefined
  }

  updateProduct = async(id, update) => {
    let product = await this.findProduct(id)
    let propUpdate = {...update}
    let productNew = {...product, ...update}
    if (propUpdate.thumbnail) {
      let thumbnailProp = propUpdate.thumbnail
      product.thumbnail.push(thumbnailProp)
      productNew.thumbnail = product.thumbnail
    }

    if (!product) return undefined
    await this.deleteProduct(id)
    let productsOld = await this.getProducts()
    let productsUpdate = [{...productNew, id : id}, ...productsOld]
    await this.writeProducts(productsUpdate)
    return productsUpdate;
  }

  deleteProduct = async(id) => {
    let content = await this.getProducts()
    let product = content.some(i => i.id === id)
    let updateProducts = content.filter(i => i.id != id)

    if (!product) return undefined
    else {
      await this.writeProducts(updateProducts)
      return updateProducts
    }
  }
  
  addProduct = async(product) => {
    let productsOld = await this.getProducts()
    if (!product.title || !product.description || !product.price || !product.code || !product.stock) return 'Complete todos los campos'
    if (!product.thumbnail) {
      product.thumbnail = []
    } else {
      product.thumbnail = [product.thumbnail]
    }
    let productNew = {id: nanoid(5), status: true, ...product}
    let productAdd = [...productsOld, productNew]
    await this.writeProducts(productAdd)

    return productNew
  }
}