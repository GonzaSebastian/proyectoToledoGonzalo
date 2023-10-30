import { Router } from "express";
import { viewsGetProducts, viewsGetProductsRealTime, viewsCart, chatViewController } from "../controllers/views.controller.js";
import { publicRoutes } from "../middlewares/auth.middleware.js";

const viewsRouter = Router()

viewsRouter.get("/", publicRoutes, viewsGetProducts)

viewsRouter.get("/realtimeproducts", viewsGetProductsRealTime)

viewsRouter.get("/chat", chatViewController)

viewsRouter.get("/cart/", viewsCart)

export default viewsRouter