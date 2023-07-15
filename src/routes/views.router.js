import { Router } from "express";
import productManager from "../controllers/productManager.js";

const viewsRouter = Router()

const product = new productManager()

viewsRouter.get("/", async(req, res) => {
  let allProducts = await product.getProducts()
  console.log(typeof(allProducts));
  res.render("index", {
    title: "Productos",
    products: allProducts
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