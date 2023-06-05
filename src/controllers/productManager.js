import fs from "fs"

export default class productManager {

  constructor(path) {
    this.path = path
  }
  getProducts = async() => JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
  
  writeProduct = async(product) => {
    let productsOld = await this.getProducts()
    let productAdd = [...productsOld, product]
    
    await fs.promises.writeFile(this.path, JSON.stringify(productAdd, null, '\t'))
    
    

    return "Product create"
  }
}