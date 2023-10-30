import BaseError from './custom-error.model';
import { httpStatusCodesEnum } from './httpStatusCodes';

class ApiError extends BaseError {
  constructor(
    message:string,
    statusCode = httpStatusCodesEnum.INTERNAL_SERVER,
    description = '',
    isOperational = true,
    additionalInfo = {},
  )
  {
    super(message, statusCode, isOperational, description, additionalInfo);
  }
}

export default ApiError;