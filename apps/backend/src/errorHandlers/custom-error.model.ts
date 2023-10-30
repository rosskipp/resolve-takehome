/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpStatusCodesEnum } from './httpStatusCodes';

class BaseError extends Error {

  message!: string;
  statusCode!: httpStatusCodesEnum | number;
  isOperational!: boolean;
  description!: string;
  additionalInfo!: any;
  isError: boolean;

  constructor (
    name: string, 
    statusCode: httpStatusCodesEnum, 
    isOperational: boolean, 
    description: string,
    additionalInfo: any = {},
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.additionalInfo = additionalInfo;
    this.isError = true;
    Error.captureStackTrace(this);
  }
}

export default BaseError;