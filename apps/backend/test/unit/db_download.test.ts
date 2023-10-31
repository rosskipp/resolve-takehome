import checkDBStatus from '../../src/middleware/checkDBStatus';
import fs from 'fs';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('checkDBStatus', () => {

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should call next if the db file exists', async () => {
    const req = getMockReq();
    const { res, next, clearMockRes } = getMockRes();
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    await checkDBStatus(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});