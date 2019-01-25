'use strict';

process.env.SECRET = 'test';

const jwt = require('jsonwebtoken');
const server = require('../../../src/app').app;
const supergoose = require('../../supergoose');
const mockRequest = supergoose.server(server);
const User = require('../../../src/auth/models/users-model');

let users = {
  admin: {username: 'admin', password: 'password'},
};
let obj = {username:'boboob', password:'yo'};


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
          
        it('creates a function with a valid function and username', (done) => {
          return mockRequest
            .post('/createFunction')
            .set('Authorization', 'bearer '+encodedToken)
            .send({
              functionName:'function8', 
              functionCode:'module.exports=()=>{return \'hello world\';};',
            })
            .expect(200)
            .then(response => {
              expect(response.text).toEqual('');
              done();
            });
  
        });
      });
      describe('getOne module', () => {
        it('can get a user out of the database and check to see if it has any functions with the same id', () => {
          return mockRequest
            .get('/getOne')
            .set('Authorization', 'bearer '+encodedToken)
            .expect(200);
        });

      });

      // describe('users.pre', () => {
      //   it('it console logs an error if it can not populate a users with their functions', () => {
      //     let user = new User(obj);
      //     user.save()
      //       .then(userObj => {
      //         user.find('dan')
      //           .then(result => {
      //             expect(result).toEqual('Find error');
      //           });
      //       });
      //   });
      // });

      // describe('authenticate token error', () => {
      //   it('it throws an error if the token is invalid', () => {
      //     let user = new User(obj);
      //     user.save()
      //       .then(userObj => {
      //         userObj.authenticateToken(392840);
      //         expect(() => {user.authenticateToken(392840);}).toThrow('Invalid token');
      //       });
      //   });
      // });
    });
  });
});
    


// users.statics.authenticateToken = function(token){

  
//   try{
//     let parsedToken = jwt.verify(token, SECRET);

//     if((Date.now() - parsedToken.time) > TOKEN_EXPIRE){
//       return Promise.reject('Token Expired');
//     }

//     let query = {_id: parsedToken.id};
//     return this.findOne(query);
//   }
//   catch(e){
//     throw new Error('Invalid token');
//   }

// };