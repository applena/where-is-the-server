'use strict';

const error = require('../../../src/middleware/error');

'use strict';
//500
const server = require('../../../src/app').app;
const supertest = require('supertest');
const mockRequest = supertest(server);
describe('error test', () => {

  it('should respond with a 500 on an error', (done) => {

    return mockRequest
      .post('/signin')
      .then(results => {
        expect(results.status).toBe(500);
        done();
      }).catch(console.error);

  });

});