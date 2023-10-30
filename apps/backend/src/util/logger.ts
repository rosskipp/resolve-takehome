import winston from 'winston';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;