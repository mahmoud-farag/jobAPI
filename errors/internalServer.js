import httpStatusCodes from 'http-status-codes';
 const { StatusCodes } = httpStatusCodes;
import  {CustomAPIError} from './custom-api.js';

class InternalServerError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export {InternalServerError};
