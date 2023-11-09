import { Router } from "express";
import { getProductsController, getProductByIdController, addProductController, deleteProductController, updateProductController} from "../controllers/product.controller.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

const productRouter = Router()

productRouter.get('/', handlePolicies(["ADMIN", "USER", "PREMIUM"]), getProductsController)

productRouter.get("/:pid", handlePolicies(["ADMIN", "USER", "PREMIUM"]), getProductByIdController)

productRouter.post("/", handlePolicies(["ADMIN", "PREMIUM"]), addProductController)

productRouter.delete("/:pid", handlePolicies(["ADMIN"]), deleteProductController)

productRouter.put("/:pid", handlePolicies(["ADMIN"]), updateProductController)

export default productRouter