  import httpStatusCodes from 'http-status-codes';
// import { CustomAPIError } from '../errors/custom-api.js';

const { StatusCodes } = httpStatusCodes;
 
const errorHandlerMiddleware = (err, req, res) => {

  const customError= {
    message: err ||  'Internal server error',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }
  // if (err instanceof CustomAPIError){
  //   return res.status(err.statusCode).json({msg: err.message});
  // }

  return res.status (customError.statusCode).json({mesg:customError.message});
}

export {errorHandlerMiddleware}
