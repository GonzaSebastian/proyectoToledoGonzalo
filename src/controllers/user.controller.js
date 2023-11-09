import UserDTO from "../dto/user.dto.js";
import logger from "../logger.js";
import { UserService } from "../services/index.js";
import { sendDeletedAccountEmail } from "../services/nodemailer.js";

export const userPremiumController = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.uid)
    await UserService.findAndUpdate(req.params.uid, {role: user.role === 'user' ? 'premium' : 'user'})
    res.json({ status: 'success', message: 'Updated user role' })
  } catch(err) {
    res.json({ status: 'error', error: err.message })
  }
}

export const getUsersController = async (req, res) => {
  try {
    const users = await UserService.getUsers()
    const usersDao = users.map( (user) => new UserDTO(user) )
    res.json({ status: 'success', payload: usersDao })

  } catch (err){
    res.json({ status: 'error', message: err.message })
  }
}

export const deleteInactiveUserController = async (req, res) => {
  try {
      const currentDate = new Date()
      const twoDaysAgo = new Date(currentDate)
      twoDaysAgo.setDate(currentDate.getDate() -2)
      const findInactiveUsers = await UserService.getUsers( { last_connection: {$lt: twoDaysAgo} })


      const users = findInactiveUsers.map((user) => new UserDTO(user))
      const inactiveUsers = users.filter((user) => user.role !== 'admin')

      console.log(inactiveUsers);

      if (inactiveUsers.length > 0) {
          for (const user of inactiveUsers) {
              if (user.role != 'admin') {
                await sendDeletedAccountEmail(req, user)
                await UserService.deleteUser(user.id)
              }
          }
          res.status(200).json({ status: 'success', message: 'Inactive users have been removed' })
      } else {
          res.status(404).json({ status: "error", message: "There are not inactive users" })
      }
  } catch (err) {
      logger.info(err.message)
      res.status(500).json({ status: "error1", message: "Server Error" })
  }
}