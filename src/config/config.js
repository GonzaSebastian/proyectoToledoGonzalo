import { config } from 'dotenv'
config()

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME

export const SECRET_PASS = process.env.SECRET_PASS

export const ENVIRONMENT = process.env.ENVIRONMENT

export const NODEMAILER_USER = process.env.NODEMAILER_USER
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS