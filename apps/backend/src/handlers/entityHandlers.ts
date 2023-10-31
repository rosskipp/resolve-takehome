import ApiError from '../errorHandlers/apiError';
import createDbConnection from '../db/db';
import logger from '../util/logger';
import { ApiEntity, PropertyGroup, DBEntityRow } from '../types';


export const getEntityById = async (id: number) => {
  try {
    // we have to create the db connectin here because the db might not exist
    // if we do it outside, then there could be an error
    const db = createDbConnection();

    const sql = `
    SELECT
      oe.entity_id,
      oe.attribute_id,
      oe.value_id,
      oa.name,
      oa.category,
      oa.data_type,
      oa.flags,
      ov.value
    from
      "_objects_eav" oe
    JOIN "_objects_attr" oa on
      oa.id = oe.attribute_id
    JOIN "_objects_val" ov on
      oe.value_id = ov.id
    where
      entity_id = ${id};
    `;


    const rows: DBEntityRow[] = await new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
        logger.info(`getEntityById: ${rows}`);
        resolve(rows as DBEntityRow[]);
      });
    });
    return processEntityRows(rows);
  } catch (error) {
    throw new ApiError(`Error getting entity by id ${error.message}`);
  }

};

const processEntityRows = (rows: DBEntityRow[]): ApiEntity => {
  if (rows.length === 0) {
    return {
      entityId: 0,
      name: '',
      properties: {}
    };
  }
  const groups: PropertyGroup = {};
  const entity: ApiEntity = {
    entityId: rows[0].entity_id,
    name: '',
    properties: {}
  };
  rows.forEach(row => {
    // if this is the name field, then grab it for the name of our entity
    if (row.category === '__name__') {
      entity.name = row.value;
    }
    // ignore categories that start with __
    if (row.category.slice(0, 2) !== '__') {
      if (!groups[row.category]) {
        groups[row.category] = {};
      }
      groups[row.category][row.name] = row.value;
    }
  });
  entity.properties = groups;
  return entity;
};