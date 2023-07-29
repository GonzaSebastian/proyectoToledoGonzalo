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

sessionsRouter.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if(err) {
          console.log(err);
          res.status(500).render('errors/base', {error: err})
      } else res.redirect('/session/register')
  })
})

sessionsRouter.get('/user/getpreference', (req, res) => {
  const preference = req.session.user
  res.json(preference.location)
})

sessionsRouter.get('/user/deletepreference', (req, res) => {
  req.session.destroy((err => {
    if (err) return res.json({status: 'error', message: 'Ocurrio un error'})
    return res.json({status: 'succes', message: 'Session eliminada'})
  }))
})

export default sessionsRouter