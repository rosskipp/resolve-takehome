import { Request, Response, NextFunction } from 'express';
import allowedOrigins from '../util/allowedOrigins';

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin ?? '';
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

export default credentials;