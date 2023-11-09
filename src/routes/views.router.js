import { Router } from "express";
import { viewsGetProducts, viewsGetProductsRealTime, viewsCart, chatViewController } from "../controllers/views.controller.js";
import { handlePolicies, publicRoutes } from "../middlewares/auth.middleware.js";

const viewsRouter = Router()

viewsRouter.get("/", publicRoutes, viewsGetProducts)

viewsRouter.get("/realtimeproducts", handlePolicies(["ADMIN", "PREMIUM"]), viewsGetProductsRealTime)

viewsRouter.get("/chat", chatViewController)

viewsRouter.get("/cart/", viewsCart)

export default viewsRouter