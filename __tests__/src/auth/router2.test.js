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