/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from './apiError';
import BaseError from './custom-error.model';
import { httpStatusCodesEnum } from './httpStatusCodes';

function logError (err: any) {
  console.error(err);
}
   
function returnError (err: any, req: any, res: any, next: any) {
  logError(err);
  const status = err.statusCode ? err.statusCode : httpStatusCodesEnum.INTERNAL_SERVER;
  res.status(status).json(!err.statusCode ? new ApiError(err.message) : err);
}
   
function isOperationalError(error: any) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}
   
export {
  logError,
  returnError,
  isOperationalError,
};