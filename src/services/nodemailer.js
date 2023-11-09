import { NODEMAILER_PASS, NODEMAILER_USER, PORT } from '../config/config.js'
import nodemailer from 'nodemailer'
import logger from '../logger.js'
import ticketModel from '../models/ticket.model.js';
import { generateUniqueCode } from '../utils.js';
import UserPasswordModel from '../models/password.model.js';


export const getBill = async(saveTicket, user) => {
  try {
    const code = saveTicket.code

    const ticket = await ticketModel.findOne({code : code})
    // console.log(ticket);
    let config = {
      service: 'gmail',
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
      }
    }

    const transporter = nodemailer.createTransport(config)

    const productsHTML = ticket.products && Array.isArray(ticket.products)
    ? ticket.products.map(product => `
      <p><strong>${product.product.title}</strong>: $ ${product.product.price}</p>
      <p>Cantidad: ${product.quantity}</p>
    `).join('') : ''



    const message = {
      from: NODEMAILER_USER,
      to: user.email,
      subject: `Ecommerce - ${user.first_name} gracias por tu compra!`,
      html: `<b> Detalle de su compra: </b> 
      <br>
      <p>Codigo: ${ticket.code}</p>
      ${productsHTML}
      <h5>Total: ARS $${ticket.amount}</h5>
      `
    }

    transporter.sendMail(message)

  } catch (err) {
    logger.error(err)
  }
}

export const resetPass = async(email, req) => {
  const token = generateUniqueCode(10)
  await UserPasswordModel.create({ email, token })

  const config = { 
    service: 'gmail',
    auth: { user: NODEMAILER_USER, pass: NODEMAILER_PASS }
   }
   let transporter = nodemailer.createTransport(config)
   let message = {
    from: NODEMAILER_USER,
    to: email,
    subject: 'Ecommerce - Reestablecer contraseña',
    html: `<h1>Reestablezca su contraseña </h1> <hr /> Para cambiar su contraseña, haga click a continuacion: 
    <a href="http://${req.hostname}:${PORT}/api/session/reset-pass/${token}">Nueva contraseña</a> `
   }
   await transporter.sendMail(message)
}

export const sendDeletedAccountEmail = async(req, user) => {
  const config = {
    service: 'gmail',
    auth: {user: NODEMAILER_USER, pass: NODEMAILER_PASS}
  }
  let transporter = nodemailer.createTransport(config)
  let message = {
    from: NODEMAILER_USER,
    to: user.email,
    subject: 'Ecommerce - Su cuenta fue removida.',
    html: `<h5> ${user.first_name} hemos eliminado tu cuenta por inactividad. </h5> <hr /> Para volver a registrarte, hace click a continuacion:
    <a href="http://${req.hostname}:${PORT}/api/session/register">Registrate</a> `
  }
  await transporter.sendMail(message)
}