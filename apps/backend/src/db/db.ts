import sqlite3 from 'sqlite3';
import path from 'path';
import { LOCAL_DB_FILE_NAME, LOCAL_DB_FOLDER } from '../util/secrets';
import logger from '../util/logger';

const createDbConnection = (): sqlite3.Database => {

  if (!LOCAL_DB_FILE_NAME || !LOCAL_DB_FOLDER) {
    throw new Error('Missing environment variables');
  }
  sqlite3.verbose();
  const localDbPath = path.join(LOCAL_DB_FOLDER, LOCAL_DB_FILE_NAME);
  const db = new sqlite3.Database(localDbPath, error => {
    if (error) {
      logger.error('Failed to connect to DB', error.message);
      throw new Error('Failed to connect to DB');
    }
  });
  logger.info("Connection with SQLite has been established");
  return db;
};

export default createDbConnection;