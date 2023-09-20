import winston from "winston";
import { ENVIRONMENT } from "./config/config.js";

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning:2,
    info:3,
    http:4,
    debug:5
  },
  colors: {
    fatal: 'red',
    error: 'green',
    warning: 'yellow',
    info: 'blue',
    http: 'cyan',
    debug: 'white'
  }
}

winston.addColors(customLevelOptions.colors)

// EJEMPLO LAMINAS
const createLogger = (env) => {
  if (env == 'PROD') {
    return winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.File({
          filename: './logs/serverlogs.log',
          level: "info",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple()
          )
        }),
      ]
    })
  } else {
    return winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: "debug",
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.simple()
          )
        }),
      ]
    })
  }
} 

const logger = createLogger(ENVIRONMENT)

export default logger

// new winston.transports.File({
//   filename: './errors.log',
//   level: 'warning',
//   format: winston.format.simple()
// })
// export const addLogger = (req, res, next) => {
//   req.logger = logger
//   req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
//   next()
// }