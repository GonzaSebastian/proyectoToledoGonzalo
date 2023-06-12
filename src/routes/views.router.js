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

export default viewsRouter