import bcrypy, {genSaltSync} from 'bcrypt'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
import shortid from "shortid"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

export const createHash = password => {
  return bcrypy.hashSync(password, genSaltSync(10))
}
export const isValidPassword = (user, password) => {
  return bcrypy.compareSync(password, user.password)
}

export const generateUniqueCode = () => {
  return shortid.generate();
};

