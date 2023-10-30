import { Router, Request, Response, NextFunction } from 'express';
import * as entityHandlers from '../handlers/entityHandlers';

import logger from '../util/logger';

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  logger.info('call to get entity by id');
  try {
    const entities = await entityHandlers.getEntityById(Number(req.params.id));
    console.log(JSON.stringify(entities, null, 2));
    res.json(entities);
  } catch (error) {
    logger.error(`error getting all fields: ${error}`);
    next(error);
  }
});

export default router;