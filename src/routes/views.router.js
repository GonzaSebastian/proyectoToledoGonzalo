import { Router } from "express";
import productManager from "../controllers/productManager.js";

const viewsRouter = Router()

const product = new productManager("./src/models/products.json")

viewsRouter.get("/", async(req, res) => {
  let allProducts = await product.getProducts()
  res.render("index", {
    title: "Productos",
    products: allProducts
  })
})

viewsRouter.get("/realtimeproducts", async(req, res) => {
  let allProducts = await product.getProducts()
  res.render("realTimeProducts", {
    title: "Productos RealTime",
    products: allProducts
  })
})

export default viewsRouter