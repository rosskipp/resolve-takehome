import ApiError from '../errorHandlers/apiError';
import allowedOrigins from './allowedOrigins';

const corsOptions = {
  origin: (origin: string, callback: (error: Error | null, allowed: boolean) => void) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new ApiError('Not allowed by CORS'), false);
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;