import { Router } from "express";

const sessionsRouter = Router()

sessionsRouter.get('/', (req, res) => {
  res.json({status: 'succes', message: 'Route /sessions'})
})

// VISTA REGISTER
sessionsRouter.get('/register', (req, res) => {
  res.render('session/register')
})

// API REGISTER
sessionsRouter.post('/register',(req, res) => {
  const newUser = req.body
  if (newUser.email == 'adminCoder@coder.com' && newUser.password == 'coder') {
    newUser.role = 'admin'
  } else {
    newUser.role = 'user'
  }
  req.session.user = newUser
  res.redirect('/session/login') 
})

// VISTA LOGIN
sessionsRouter.get('/login', (req, res) => {
  res.render('session/login')
})

// API LOGIN
sessionsRouter.post('/login', (req, res) => {
  const userCookie = req.session.user
  const {email, password} = req.body
  if (email !== userCookie.email || password !== userCookie.password) {
    res.redirect('/session/register')
  } else {
    if (userCookie.role == 'user') {
      res.redirect('/products')
    } else {
      res.redirect('/products/realtimeproducts')
    }
  }
})
// API LOGOUT
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