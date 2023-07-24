import { Router } from "express";
import productManager from "../controllers/productManager.js";

const viewsRouter = Router()

const product = new productManager()

viewsRouter.get("/", async(req, res) => {
  let page = parseInt(req.query.page) 
  let limit = parseInt(req.query.limit)
  let stock = req.query.stock
  let category = req.query.category
  let sort = req.query.sort
  let result = await product.getProducts(page, limit, stock, category, sort)

  result.prevLink = result.hasPrevPage ? `?page=${result.prevPage}` : ''
  result.nextLink = result.hasNextPage ? `?page=${result.nextPage}` : ''
  
  res.render("products", {
    title: "Productos",
    products: result
  })
})

viewsRouter.get("/realtimeproducts", async(req, res) => {
  let products = await product.getProducts()
  res.render("realTimeProducts", {
    title: "Productos RealTime",
    products: products
  })
})

export default viewsRouter