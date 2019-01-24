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

      describe('handle Create Function', () => {

        it('throws an error if a function name is not a valid path', (done) => {
          return mockRequest
            .post('/createFunction')
            .set('Authorization', 'bearer '+encodedToken)
            .send({
              functionName:'function foobar', 
              functionCode:'module.exports=()=>{return \'hello world\';};',
            })
            .expect(500)
            .then(response => {
              expect(response.text).toEqual('{"error":"Invalid function name"}');
              done();
            });
        });

        // it('throws an error if a user name is not a valid path', (done) => {
        //   return mockRequest
        //     .post('/createFunction')
        //     .set('Authorization', 'bearer '+encodedToken)
        //     .send({
        //       functionName:'function', 
        //       functionCode:'module.exports=()=>{return \'hello world\';};',
        //     })
        //     .expect(500)
        //     .then(response => {
        //       expect(response.body).toEqual({error: 'Invalid function name'});
        //     });
        // });
          
        it('creates a function with a valid function and username', () => {
          return mockRequest
            .post('/createFunction')
            .set('Authorization', 'bearer '+encodedToken)
            .send({
              functionName:'function1', 
              functionCode:'module.exports=()=>{return \'hello world\';};',
            })
            .expect(200);
  
        });
      });


    });
    
  });
  
});