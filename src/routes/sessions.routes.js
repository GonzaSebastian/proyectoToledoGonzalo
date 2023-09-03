import { Router } from "express";
import passport from "passport";
import { sessionCurrentController, sessionFailLoginController, sessionFailRegister, sessionLoginController, sessionLogoutController, sessionRegisterController, sessionRootController } from "../controllers/sessions.controller.js";

const sessionsRouter = Router()

sessionsRouter.get('/', sessionRootController)

// VISTA REGISTER
sessionsRouter.get('/register', sessionRegisterController)

sessionsRouter.post('/register', passport.authenticate('register', {successRedirect: '/api/session/login', failureRedirect: '/api/session/register'}))

sessionsRouter.get('/failRegister', sessionFailRegister)

// VISTA LOGIN
sessionsRouter.get('/login', sessionLoginController)

// API LOGIN
sessionsRouter.post('/login', passport.authenticate('login', {successRedirect: '/products', failureRedirect: '/session/failLogin'}))

sessionsRouter.get('/failLogin', sessionFailLoginController)

// API LOGIN GITHUB
sessionsRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req, res) => {})
sessionsRouter.get('/githubLog', passport.authenticate('github', {successRedirect: '/products', failureRedirect: '/login'}))

// LOGOUT
sessionsRouter.get('/logout', sessionLogoutController)

sessionsRouter.get('/current', sessionCurrentController)

export default sessionsRouter