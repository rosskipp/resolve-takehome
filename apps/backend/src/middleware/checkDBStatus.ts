import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import ApiError from '../errorHandlers/apiError';
import dotenv from 'dotenv';

// TODO: refactor this into a secrets file
dotenv.config();

const dbFolder = process.env.LOCAL_DB_FOLDER ?? '../../db';
const dbName = process.env.LOCAL_DB_FILE_NAME ?? 'props.db';
const s3Url = process.env.DB_S3_URL ?? 'https://resolve-dev-public.s3.amazonaws.com/sample-data/interview/props.db';


const checkDBStatus = async (req: Request, res: Response, next: NextFunction) => {
  if (fs.existsSync(path.join(dbFolder, dbName))) {
    // If the DB file exists then continue
    next();
  } else {
    // download and save the db file
    const response = await fetch(s3Url);
    const writer = fs.createWriteStream(path.join(dbFolder, dbName), { flags: 'wx' });
    const reader = response.body?.getReader();
    // TODO: figure out how to type this properly
    reader?.read().then(function pump({ done, value }): any {
      if (value) {
        writer.write(value);
      }
      if (done) {
        writer.close();
        return next();
      } else {
        return reader.read().then(pump);
      }
    });
    writer.on('error', (error) => { throw new ApiError(`Failed to download DB: ${error.message}`); });
  }
};

export default checkDBStatus;