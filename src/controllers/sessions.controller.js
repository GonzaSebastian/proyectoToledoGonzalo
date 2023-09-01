import { ProductService } from "../services/index.js";
import passport from "passport";

export const sessionRootController = (req, res) => res.json({status: 'success', message: 'Route /sessions'})

export const sessionRegisterController = (req, res) => res.render('session/register')

export const sessionFailRegister = (req, res) => res.send({error:'fail register'})

export const sessionLoginController = (req, res) => res.render('session/login')

export const sessionFailLoginController = (req, res) => res.send({error:'fail login'})

export const sessionLogoutController = (req, res) => {
  req.session.destroy(err => {
      if(err) {
          console.log(err);
          res.status(500).render('errors/base', {error: err})
      } else res.redirect('/api/session/login')
  })
}