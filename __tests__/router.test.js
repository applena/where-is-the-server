'use strict';


// const routerExports = require('../src/router');
// const router = routerExports.router;
// const functionExists = routerExports.functionExists;
// const handleCreateFunction = routerExports.handleCreateFunction;
// const fileExists = routerExports.fileExists;
// const handleCreate = routerExports.handleCreate;
// const handleGetUserFunctions = routerExports.handleGetUserFunctions;
// const jest = require('jest');

jest.mock('fs');

const fileExists = require('./../src/modules/fileExists');

describe ('file exists', ()=> {
  it (`returns false when a file doesn't exist`, (done) => {
    const path = '/file/path/data.txt';
    fileExists(path)
      .then(res => {
        console.log(`result of promise: ${res}`);
        expect(res).toEqual(false);
        done();
      })
      .catch( err => {
        console.log(`got an error: ${err}`);
      });
  });

  it (`returns true when a good file path is given`, () => {
    const path = `./folder/folder2/no_problems_here.js`;
    fileExists(path)
      .then(res => {
        console.log(`result of promise: ${res}`);
        expect(res).toEqual(true);
      })
      .catch( err => {
        console.log(`got an error: ${err}`);
      });
  });
});

// describe('fs mock test', ()=> {
//   it('calls the mock', () => {

//   });

//   it('doesnt read actual files', () => {

//   });
// });