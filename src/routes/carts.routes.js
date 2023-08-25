import { Router } from "express";
import {getCart, addCart, addProductInCart, deleteProductInCart, cleanCart, updateQuantityProduct} from "../controllers/cart.controller.js";

const cartsRouter = Router()

cartsRouter.get("/", getCart)

cartsRouter.post("/", addCart)

cartsRouter.post("/:cid/products/:pid", addProductInCart)

cartsRouter.delete("/:cid/products/:pid", deleteProductInCart)

cartsRouter.delete("/:cid", cleanCart)

cartsRouter.put("/:cid/products/:pid", updateQuantityProduct)

export default cartsRouter