'use strict';

jest.mock('fs');

const handleCreate = require('../../../src/modules/handleCreate');

describe ('file can be created', ()=> {
  it (`promise resolves if the inputs for file creation are correct`, (done) => {
    const path = '/file/path/data.txt';
    const data = 'hello';
    handleCreate(path,data)
      .then(res => {
        console.log(`result of promise: ${res}`);
        expect(res).toEqual(undefined);
        done();
      })
      .catch( err => {
        console.log(`got an error: ${err}`);
      });
  });

  it (`promise rejects if the inputs for file creation are correct`, (done) => {
    const path = '/file/path/data.txt';
    handleCreate(path)
      .then(res => {
        console.log(`result of promise: ${res}`);
        expect(res).toEqual(undefined);
        done();
      })
      .catch( err => {
        console.log(`got an error: ${err}`);
      });
  });
});
