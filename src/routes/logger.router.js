import { Router } from "express";
import logger from "../logger.js";

const loggerTestRouter = Router()

loggerTestRouter.get('/', (req, res) => {
    logger.fatal('TEST FATAL LOGGER'),
    logger.error('TEST ERROR LOGGER'),
    logger.warning('TEST WARNING LOGGER'),
    logger.info('TEST INFO LOGGER'),
    logger.http('TEST HTTP LOGGER'),
    logger.debug('TEST DEBUG LOGGER')

    res.json({status: 'success'})
  }
)

export default loggerTestRouter