'use strict';

process.env.SECRET='test';

const {startDB,stopDB} = require('../../supergoose');
const auth = require('../../../src/auth/auth-middleware');
const Users = require('../../../src/auth/models/users-model');


let users = {
  admin: {username: 'admin', password: 'password', capability: ['c','u','d']},
};

beforeAll(async (done) => {
  await startDB();
  const admin = await new Users(users.admin).save();
  done();
});

afterAll(stopDB);
 
describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  let errorMessage = 'Resource not found';

  describe('user authentication', () => {

    let cachedToken;

    it('fails a login for a user (admin) with the incorrect basic credentials', (done) => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46Zm9v',
        },
      };
      let res = {};
      let next = jest.fn();
      let middleware = auth();

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith(errorMessage);
          done();
        });

    }); 

    it('fails a login for a user (admin) with an incorrect bearer token', () => {

      let req = {
        headers: {
          authorization: 'Bearer foo',
        },
      };
      let res = {};
      let next = jest.fn();
      let middleware = auth();


      middleware(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);

    }); 

    it('logs in an admin user with the right credentials', (done) => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      };
      let res = {};
      let next = jest.fn();
      let middleware = auth();

      return middleware(req,res,next)
        .then( () => {
          cachedToken = req.token;
          expect(next).toHaveBeenCalledWith();
          done();
        });

    }); 

    it('logs in an admin user with a correct bearer token', (done) => {

      let req = {
        headers: {
          authorization: `Bearer ${cachedToken}`,
        },
      };
      let res = {};
      let next = jest.fn();
      let middleware = auth();

      return middleware(req,res,next)
        .then( () => {
          expect(next).toHaveBeenCalledWith();
          done();
        });

    });

  });

  describe('user authorization', () => {

    it('restricts access to a valid user without permissions', (done) => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      };
      let res = {};
      let next = jest.fn();
      let middleware = auth('godpower');

      return middleware(req,res,next)
        .then( () => {
          expect(next).toHaveBeenCalledWith(errorMessage);
          done();
        });

    }); 

    it('grants access when a user has permission', (done) => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      };
      let res = {};
      let next = jest.fn();
      let middleware = auth();

      return middleware(req,res,next)
        .then( () => {
          expect(next).toHaveBeenCalledWith();
          done();
        });

    }); 

  }); 

});

