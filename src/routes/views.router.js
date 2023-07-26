import { Router } from "express";
import productManager from "../controllers/productManager.js";
import cartManager from "../controllers/cartManager.js";

const viewsRouter = Router()

const product = new productManager()
const cart = new cartManager()

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
    products: result,
    user: req.session.user
  })
})

viewsRouter.get("/cart/:cid", async(req, res) => {
  const cartId = req.params.cid
  let cartView = await cart.getCartById(cartId)
  res.render("cart", {
    title: "Carrito",
    cart: cartView
  })
})

viewsRouter.get("/realtimeproducts", async(req, res) => {
  let products = await product.getProducts()
  const user = 
  res.render("realTimeProducts", {
    title: "Productos RealTime",
    products: products,
    user: req.session.user
  })
})

export default viewsRouter