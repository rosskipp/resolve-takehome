import { Router, Request, Response, NextFunction } from 'express';
import * as entityHandlers from '../handlers/entityHandlers';

import logger from '../util/logger';

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  logger.info('call to get entity by id');
  try {
    const allFields = await entityHandlers.getEntityById(Number(req.params.id));
    res.json(allFields);
  } catch (error) {
    logger.error(`error getting all fields: ${error}`);
    next(error);
  }
});

export default router;