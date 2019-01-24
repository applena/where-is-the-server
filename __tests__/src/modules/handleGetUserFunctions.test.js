'use strict';

// jest.mock('fs');
const fs = require('../../../__mocks__/fs.js');
const handleGetUserFunctions = require('../../../src/modules/handleGetUserFunctions');
const supertest = require('supertest');
const server = require ('../../../src/app.js').app;
const mockRequest = supertest(server);

describe ('get user functions from file system', ()=> {

  it (`returns an array of user functions`, () => {
    let expectedPath = `${process.cwd()}/src/users/john`;
    const req = {
      params: {
        username: 'john',
      },
    };
    
    const res = {};
    const next = function() {};
    const spy = jest.spyOn(fs, 'readdir');

    handleGetUserFunctions(req, res, next);

    expect(spy).toHaveBeenCalledWith(expectedPath, expect.any(Function));
  });

  it (`calls next when path is bad`, () => {
    return mockRequest
      .get('/functions/john')
      .then(results => {
        expect(results.status).toBe(200);
      });
      
  });
});

