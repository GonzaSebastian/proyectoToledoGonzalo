import { Router } from "express";
import { getProducts, getProductById, addProduct, deleteProduct, updateProduct} from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.get('/', getProducts)

productRouter.get("/:pid", getProductById)

productRouter.post("/", addProduct)

productRouter.delete("/:pid", deleteProduct)

productRouter.put("/:pid", updateProduct)

export default productRouter