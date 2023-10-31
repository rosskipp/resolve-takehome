import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import ApiError from '../errorHandlers/apiError';
import logger from '../util/logger';
import { DB_S3_URL, LOCAL_DB_FILE_NAME, LOCAL_DB_FOLDER } from '../util/secrets';

const checkDBStatus = async (req: Request, res: Response, next: NextFunction) => {
  // Need to appease typescript and check these exist
  if (!DB_S3_URL || !LOCAL_DB_FILE_NAME || !LOCAL_DB_FOLDER) {
    throw new ApiError('Missing environment variables');
  }

  const localDbPath = path.join(LOCAL_DB_FOLDER, LOCAL_DB_FILE_NAME);

  try {
    // If the folder doesn't exist, then create it
    if (!fs.existsSync(LOCAL_DB_FOLDER)) {
      fs.mkdirSync(LOCAL_DB_FOLDER);
    }

    // If the DB file exists then continue
    if (fs.existsSync(localDbPath)) {
      next();
    }

    // If the file doesn't exist, download and save the db file
    const response = await fetch(DB_S3_URL);
    const writer = fs.createWriteStream(localDbPath, { flags: 'wx' });
    const reader = response.body?.getReader();
    // TODO: figure out how to type this properly
    reader?.read().then(function pump({ done, value }): any {
      if (value) {
        writer.write(value);
      }
      if (done) {
        writer.close();
        logger.info('DB downloaded');
        return next();
      } else {
        return reader.read().then(pump);
      }
    });
    writer.on('error', (error) => { throw new ApiError(`Failed to download DB: ${error.message}`); });
  } catch (error) {
    throw new ApiError(`Error checking DB status: ${error.message}`);
  }
};

export default checkDBStatus;