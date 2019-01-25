//404

'use strict';

const server = require('../../../src/app').app;
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {

  it('should respond with a 404 on an invalid route', (done) => {

    return mockRequest
      .get('/foobar')
      .then(results => {
        expect(results.status).toBe(404);
        done();
      }).catch(console.error);

  });

  it('should respond with a 404 on an invalid method', (done) => {

    return mockRequest
      .post('/')
      .then(results => {
        expect(results.status).toBe(404);
        done();
      }).catch(console.error);
  });
});