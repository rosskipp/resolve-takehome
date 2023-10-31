import { getEntityById, processEntityRows } from '../../src/handlers/entityHandlers';
import ApiError from '../../src/errorHandlers/apiError';
import * as createDbConnection from '../../src/db/db';
import sqlite3 from 'sqlite3';
import { DBEntityRow } from '../../src/types';

describe('entityHandlers', () => {
  describe('getEntityById', () => {
    it('should return the correct entity when called with a valid id', async () => {
      const mockEntity = {
        "entityId": 1,
        "name": "Model",
        "properties": {
          "Identity Data": {
            "Organization Name": "",
            "Organization Description": "",
            "Building Name": "",
            "Author": ""
          },
          "Energy Analysis": {
            "Energy Settings": ""
          },
          "Other": {
            "Project Issue Date": "Issue Date",
            "Project Status": "Project Status",
            "Client Name": "Owner",
            "Project Address": "Enter address here",
            "Project Name": "Project Name",
            "Project Number": "Project Number"
          }
        }
      };

      const result = await getEntityById(mockEntity.entityId);
      expect(result).toEqual(mockEntity);
    });

    it('should throw an ApiError when the database query fails', async () => {
      try {
        await getEntityById(-100);
      } catch (error) {
        expect(error).toEqual(ApiError);
      }
    });
  });

  describe('processEntityRows', () => {

    it('should correctly process Database entity rows into an ApiEntity if no rows show up', () => {
      const rows: DBEntityRow[] = [];

      const result = processEntityRows(rows);

      expect(result).toEqual({
        entityId: 0,
        name: '',
        properties: {},

      });
    });

    it('should correctly process Database entity rows into an ApiEntity', () => {
      const rows: DBEntityRow[] = [
        { entity_id: 1, attribute_id: 1, value_id: 1, name: 'Test Entity', category: '__name__', data_type: 0, flags: 0, value: 'Test Entity' },
        { entity_id: 1, attribute_id: 20, value_id: 3, name: 'Dont Show', category: '__dontShow__', data_type: 0, flags: 0, value: 'Test Entity' },
        { entity_id: 1, attribute_id: 2, value_id: 2, name: 'test-prop', category: 'test-category', data_type: 0, flags: 0, value: 'value' },
      ];

      const result = processEntityRows(rows);

      expect(result).toEqual({
        entityId: 1,
        name: 'Test Entity',
        properties: {
          'test-category': {
            'test-prop': 'value',
          },
        },
      });
    });
  });
});