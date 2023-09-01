import { Router } from "express";
import {getCartController, addCartController, addProductInCartController, deleteProductInCartController, cleanCartController, updateQuantityProductController} from "../controllers/cart.controller.js";

const cartsRouter = Router()

cartsRouter.get("/", getCartController)

cartsRouter.post("/", addCartController)

cartsRouter.post("/:cid/products/:pid", addProductInCartController)

cartsRouter.delete("/:cid/products/:pid", deleteProductInCartController)

cartsRouter.delete("/:cid", cleanCartController)

cartsRouter.put("/:cid/products/:pid", updateQuantityProductController)

export default cartsRouter