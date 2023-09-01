import { Router } from "express";
import { getProductsController, getProductByIdController, addProductController, deleteProductController, updateProductController} from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.get('/', getProductsController)

productRouter.get("/:pid", getProductByIdController)

productRouter.post("/", addProductController)

productRouter.delete("/:pid", deleteProductController)

productRouter.put("/:pid", updateProductController)

export default productRouter