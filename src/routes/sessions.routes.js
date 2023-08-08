import { Router } from "express";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const sessionsRouter = Router()

sessionsRouter.get('/', (req, res) => {
  res.json({status: 'succes', message: 'Route /sessions'})
})

// VISTA REGISTER
sessionsRouter.get('/register', (req, res) => {
  res.render('session/register')
})

// API REGISTER
sessionsRouter.post('/register', passport.authenticate('register',{
  failureRedirect: '/session/failRegister'
}), async(req, res) => {
  res.redirect('/session/login') 
})

sessionsRouter.get('/failRegister', (req, res) =>{
  res.send({error:'fail register'})
})

// VISTA LOGIN
sessionsRouter.get('/login', (req, res) => {
  res.render('session/login')
})

// API LOGIN
sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: '/session/failLogin'}), async (req, res) =>{
      res.redirect('/products')
})

sessionsRouter.get('/failLogin', (req, res) =>{
  res.send({error:'fail login'})
})

// API LOGIN GITHUB
sessionsRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req, res) => {})
sessionsRouter.get('/githubLog', passport.authenticate('github', {failureRedirect: '/login'}), async(req, res) => {
  res.redirect('/products')
})

// LOGOUT
sessionsRouter.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if(err) {
          console.log(err);
          res.status(500).render('errors/base', {error: err})
      } else res.redirect('/session/login')
  })
})

sessionsRouter.get('/user/getpreference', (req, res) => {
  const preference = req.session.user
  res.json(preference.location)
})



export default sessionsRouter