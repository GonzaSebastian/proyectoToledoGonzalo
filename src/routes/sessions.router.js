import { Router } from "express";
import passport from "passport";
import { forgetPasswordController, forgetPasswordViewController, passportLoginController, resetPasswordController, resetPasswordViewController, sessionCurrentController, sessionFailLoginController, sessionFailRegister, sessionLoginController, sessionLogoutController, sessionRegisterController, sessionRootController, verifyTokenController } from "../controllers/sessions.controller.js";

const sessionsRouter = Router()

sessionsRouter.get('/', sessionRootController)

// VISTA REGISTER
sessionsRouter.get('/register', sessionRegisterController)

sessionsRouter.post('/register', passport.authenticate('register', {successRedirect: '/api/session/login', failureRedirect: '/api/session/register'}))

sessionsRouter.get('/failRegister', sessionFailRegister)

// VISTA LOGIN
sessionsRouter.get('/login', sessionLoginController)

// API LOGIN
sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: '/session/failLogin'}))

sessionsRouter.post('/login', passportLoginController)

sessionsRouter.get('/failLogin', sessionFailLoginController)

// API LOGIN GITHUB
sessionsRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req, res) => {})
sessionsRouter.get('/githubLog', passport.authenticate('github', {successRedirect: '/products', failureRedirect: '/login'}))

// LOGOUT
sessionsRouter.get('/logout', sessionLogoutController)

// CURRENT
sessionsRouter.get('/current', sessionCurrentController)

sessionsRouter.get('/forget-pass', forgetPasswordViewController)

sessionsRouter.post('/forget-pass', forgetPasswordController)

sessionsRouter.get('/reset-pass/:token', resetPasswordViewController)

sessionsRouter.get('/verify-token/:token', verifyTokenController)

sessionsRouter.post('/reset-pass/:user', resetPasswordController)

export default sessionsRouter