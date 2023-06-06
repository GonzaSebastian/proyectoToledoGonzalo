import fs from "fs"
import {nanoid} from "nanoid"
import productManager from "./productManager.js"

const products = new productManager("./src/models/products.json")

export default class cartManager {
  constructor(path) {
    this.path = path
  }

  getCart = async() => JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

  findCart = async(id) => {
    let content = await this.getCart()
    return content.find(i => i.id === id)
  }
  
  writeCarts = async(cart) => {
    await fs.promises.writeFile(this.path, JSON.stringify(cart, null, '\t'))
  }

  addCart = async() => {
    let cartsOld = await this.getCart()
    let id = nanoid()
    let cartsConcat = [{id : id, products : []}, ...cartsOld]
    await this.writeCarts(cartsConcat)

    return cartsConcat
  }

  getCartById = async(id) => {
    let cartById = await this.findCart(id)
    if (cartById) return cartById
      return undefined
  }

  addProductInCart = async(cartId, productId) => {
    let cartById = await this.findCart(cartId)
    if (!cartById) return `Cart ID "${cartId}" Not Found`
    let productById = await products.findProduct(productId)
    if (!productById) return `Product ID "${productId}" Not Found`
    
    let cartAll = await this.getCart()
    let cartFilter = cartAll.filter(i => i.id != cartId)
    let cartConcat =  [cartById, ...cartFilter]


    if (cartById.products.some((i) => i.id === productId)) {
      let productInCart = cartById.products.find((i) => i.id === productId)
      productInCart.quantity++
      await this.writeCarts(cartConcat)
      return cartConcat
    }

    cartById.products.push({id : productById.id, quantity: 1})

    await this.writeCarts(cartConcat)
    return cartConcat
  }
}