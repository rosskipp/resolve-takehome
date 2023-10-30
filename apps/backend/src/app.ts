import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Route Files
import entityRoutes from './routes/entityRoutes';

// Others
import corsOptions from './util/corsOptions';
import { isOperationalError, returnError } from './errorHandlers/errorHandler';
import * as secrets from './util/secrets';

// Middleware
import checkDBStatus from './middleware/checkDBStatus';

// Express App Config
const app = express();

// Security
app.use(helmet());

// limit the size of a request that's accepted
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '50kb' }));

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Morgan logger
app.use(morgan('combined'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Port
app.set('port', process.env.PORT || 3001);

//
// *** Status ***
//
app.get('/status', (_req, res) => res.send('ok'));
app.get('/api/status', (_req, res) => res.send('ok'));

//
// *** API Routes ***
//

// Entity routes
app.use('/api/entity', checkDBStatus, entityRoutes);

// If we've gotten this far then send a 404
app.use('/api', (_req, res) => res.status(404).send({ error: 'Not found' }));
app.use('/', (_req, res) => res.status(404).send({ error: 'Not found' }));

// error handler middleware
app.use(returnError);

process.on('unhandledRejection', error => {
  console.error(error);
  throw error;
});

process.on('uncaughtException', error => {
  console.error(error);
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

export default app;