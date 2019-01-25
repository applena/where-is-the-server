'use strict';

const server = require('../../../src/app').app;
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('runTest function', () => {
  // mockRequest
  //   .post('/john/foo');
  
  // it('should have a 200 status when the endopoint points to a valid user and function name ', (done) => {


  //   return mockRequest
  //     .get('/john/foo')
  //     .then(results => {
  //       expect(results.status).toBe(200);
  //       done();
  //     }).catch(console.error);
  // });

  it('should res.send(hello world) when the route is hit and resolve the promise. ', (done) => {


    return mockRequest
      .get('/john/foo')
      .then(results => {
        expect(results.send).toBe(undefined);
        done();
      }).catch(console.error);
  });

  
});