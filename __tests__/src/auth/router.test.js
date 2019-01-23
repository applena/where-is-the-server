'use strict';

process.env.SECRET = 'test';

const jwt = require('jsonwebtoken');
const User = require('../../../src/auth/models/users-model');
const server = require('../../../src/app').app;
const supergoose = require('../../supergoose');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password'},
};


beforeAll( () => {
  supergoose.startDB();
});


afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {
      
      let encodedToken;
      let id;
      
      it('can create one', (done) => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
            encodedToken = results.text;
            expect(token.id).toBeDefined();
            expect(token.capability).toBeDefined();
            done();
          });
      });

      it('can signin with basic', (done) => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capability).toBeDefined();
            done();
          });
      });

      it('can signin with bearer', (done) => {
        return mockRequest.post('/signin')
          .set('Authorization', `Bearer ${encodedToken}`)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capability).toBeDefined();
            done();
          });
      });

    });
    
  });
  
});