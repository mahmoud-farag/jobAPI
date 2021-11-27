import httpStatusCodes from 'http-status-codes';
 const { StatusCodes } = httpStatusCodes;
import  {CustomAPIError} from './custom-api.js';

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export {UnauthenticatedError};
