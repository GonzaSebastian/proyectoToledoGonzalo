import { UserService } from "../services/index.js"
import logger from "../logger.js"
import { resetPass } from "../services/nodemailer.js"
import UserPasswordModel from "../models/password.model.js"
import { createHash } from "../utils.js"
import UserDTO from "../dto/user.dto.js"


export const sessionRootController = (req, res) => res.json({status: 'success', message: 'Route /sessions'})

export const sessionRegisterController = (req, res) => res.render('session/register')

export const sessionFailRegister = (req, res) => res.send({error:'fail register'})

export const sessionLoginController = (req, res) => res.render('session/login')

export const sessionFailLoginController = (req, res) => res.send({error:'fail login'})

export const sessionLogoutController = (req, res) => {
  req.session.destroy(err => {
      if(err) {
          logger.error(`from session destroy-${err}`);
          res.status(500).render('errors/base', {error: err})
      } else res.redirect('/api/session/login')
  })
}

export const sessionCurrentController = async(req, res) => {
  const preference = new UserDTO(req.session?.passport?.user)
  res.json({status: 'success', payload: preference})
}

export const passportLoginController = async(req, res) => {
  const user = await UserService.getUserById(req.session?.passport?.user)

  if (user){
    user.last_connection = new Date()
    UserService.findAndUpdate(user._id, user)
  }

  if (user.role === 'ADMIN'){
    res.redirect('./products/realtimeproducts')
  }
  res.redirect('/products')
}

export const forgetPasswordViewController = (req, res) => {
  res.render('session/forget-pass')
}

export const forgetPasswordController = async (req, res) => {
  const email = req.body.email
  const user = await UserService.getUserFindOne({ email })
  if(!user) {
    return res.status(400).json({ status: 'error', error: 'user not found' })
  }
  try {
    await resetPass(email, req)
    // res.json({ stauts: 'success', message: `Your email has successfully sent to ${email} in order to reset password` })
    res.status(200).redirect('/api/session/login')
   } catch (err) {
    res.status(500).json({ status: 'error', error: err.message })
   }
}

export const resetPasswordViewController = (req, res) => {
  res.redirect(`/api/session/verify-token/${req.params.token}`)
}

export const verifyTokenController = async (req, res) => {
  const userPassword = await UserPasswordModel.findOne({ token: req.params.token })
  if(!userPassword) {
    return res.status(404).json({ status: 'error', error: 'Invalid token / the token has expired' })
  }
  const user = userPassword.email
  res.render('session/reset-pass', { user })
}

export const resetPasswordController = async (req, res) => {
  try {
    const user = await UserService.getUserFindOne({ email: req.params.user })
    await UserService.findAndUpdate(user._id, { password: createHash(req.body.newPassword) })
    res.json({ status: 'success', message: 'se ha creado una nueva contraseña' })
    await UserPasswordModel.deleteOne({ email: req.params.user })
  } catch (err) {
    res.json({ status: 'error', error: err.message })
  }
}





