import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}

const logErrorAndExit = (errorMessage: string) => {
  logger.error(errorMessage);
  process.exit(1);
};

const ENVIRONMENT = process.env.NODE_ENV;

// export const DATABASE_URL = process.env.DATABASE_URL;
const LOCAL_DB_FOLDER = process.env.LOCAL_DB_FOLDER;
const LOCAL_DB_FILE_NAME = process.env.LOCAL_DB_FILE_NAME;
const DB_S3_URL = process.env.DB_S3_URL;

export const checkEnv = () => {
  // if (!DATABASE_URL) {
  //   logErrorAndExit('No database connection string.');
  // }
  if (!LOCAL_DB_FILE_NAME) {
    logErrorAndExit('No local db file name.');
  }
  if (!LOCAL_DB_FOLDER) {
    logErrorAndExit('No local db folder.');
  }
  if (!DB_S3_URL) {
    logErrorAndExit('No DB S3 URL.');
  }
};

checkEnv();

export {
  ENVIRONMENT,
  LOCAL_DB_FOLDER,
  LOCAL_DB_FILE_NAME,
  DB_S3_URL
};