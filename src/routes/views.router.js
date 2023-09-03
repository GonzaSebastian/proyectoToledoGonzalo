import { Router } from "express";
import { viewsGetProducts, viewsGetProductsRealTime, viewsCart } from "../controllers/views.controller.js";
import { publicRoutes } from "../middlewares/auth.middleware.js";

const viewsRouter = Router()

viewsRouter.get("/", publicRoutes, viewsGetProducts)

viewsRouter.get("/realtimeproducts", viewsGetProductsRealTime)

viewsRouter.get("/cart/:cid", viewsCart)

export default viewsRouter