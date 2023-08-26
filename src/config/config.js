import { config } from 'dotenv'
config()

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME

export const SECRET_PASS = process.env.SECRET_PASS