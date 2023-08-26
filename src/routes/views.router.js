import { Router } from "express";
import { viewsGetProducts, viewsGetProductsRealTime, viewsCart } from "../controllers/views.controller.js";


const viewsRouter = Router()

viewsRouter.get("/", viewsGetProducts)

viewsRouter.get("/realtimeproducts", viewsGetProductsRealTime)

viewsRouter.get("/cart/:cid", viewsCart)

export default viewsRouter