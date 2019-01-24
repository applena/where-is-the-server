'use strict';

const functionExists = require('../../../src/modules/functionExists');
const supergoose = require('../../supergoose');
const Function = require('../../../src/auth/models/functions-model');

beforeAll( () => {
  supergoose.startDB();
});

afterAll(supergoose.stopDB);

describe('functionExists', () => {
  let functionName = 'test';
  let dbObj = {functionName:functionName, username:'bob'};
  let user = {username:'bob'};
  
  it('returns true if a record exists with that username and function name', (done)=> {
    let newFunction = new Function(dbObj);
    newFunction.save().then(()=>{
      functionExists(user, dbObj.functionName).then((result)=>{
        expect(result).toEqual(true);
        done();
      });
    });
  });

  it('returns false if a record exists with that username but a different function name', (done)=> {
    let newFunction = new Function(dbObj);
    newFunction.save().then(()=>{
      functionExists(user, 'differentFunction').then((result)=>{
        expect(result).toEqual(false);
        done();
      });
    });
  });
        
  it('returns false if a record exists with that function name but a different username', (done)=> {
    let newFunction = new Function(dbObj);
    newFunction.save().then(()=>{
      functionExists('notBob', dbObj.functionName).then((result)=>{
        expect(result).toEqual(false);
        done();
      });
    });
  });

});