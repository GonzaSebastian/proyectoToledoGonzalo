import { Router } from "express";
import { deleteInactiveUserController, getUsersController, userPremiumController } from "../controllers/user.controller.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

const UserRouter = Router()

UserRouter.get('/', getUsersController)
UserRouter.delete('/', handlePolicies(["ADMIN"]), deleteInactiveUserController)

UserRouter.get('/premium/:uid', userPremiumController)
UserRouter.post('/:uid/documents',)

export default UserRouter