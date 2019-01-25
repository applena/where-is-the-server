'use strict';

const supertest = require('supertest');
const server = require ('../../../src/app.js').app;
const mockRequest = supertest(server);

describe ('get user functions from file system', ()=> {

  it (`sends response of 200 when the files are found`, (done) => {
    return mockRequest
      .get('/functions/john')
      .then(results => {
        expect(results.status).toBe(200);
        done();
      });
  });

  it (`calls next with 'Resource not found' when file doesn't exist`, (done) => {
    return mockRequest
      .get('/functions/john2')
      .then(results => {
        expect(results.status).toBe(500);
        done();
      });
  });

});
