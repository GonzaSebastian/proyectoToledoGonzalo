import EError from "../services/errors/enums.js";

export default (error, req, res, next) => {
  console.log(error.cause)

  switch(error.code) {
    case EError.INVALID_TYPE_ERROR:
      res.status(400).json({ status: 'error', error: error.name })
      break;
    default:
      res.send({ status: 'error', error: 'Unhandled error' })
      break;
  }
}


