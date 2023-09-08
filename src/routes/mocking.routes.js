import { Router } from "express";
import { mockingProducts } from "../controllers/mocking.controller.js";

const mockingRouter = Router()

mockingRouter.get('/', mockingProducts)

export default mockingRouter