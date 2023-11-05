import { NODEMAILER_PASS, NODEMAILER_USER } from '../config/config.js'
import nodemailer from 'nodemailer'
import logger from '../logger.js'
import ticketModel from '../models/ticket.model.js';

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