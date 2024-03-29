import { Router } from "express";
import { purchaseCartController ,getCartController, addCartController, addProductInCartController, deleteProductInCartController, cleanCartController, updateQuantityProductController} from "../controllers/cart.controller.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

const cartsRouter = Router()

cartsRouter.get("/", getCartController)

cartsRouter.post("/", addCartController)

cartsRouter.post("/:cid/products/:pid", handlePolicies(["ADMIN", "USER"]), addProductInCartController)

cartsRouter.delete("/:cid/products/:pid", deleteProductInCartController)

cartsRouter.delete("/:cid", cleanCartController)

cartsRouter.put("/:cid/products/:pid", updateQuantityProductController)

cartsRouter.post("/:cid/purchase", purchaseCartController)


export default cartsRouter