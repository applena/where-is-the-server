'use strict';

jest.mock('fs');
const fs = require('fs');
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

  it (`mkdir will not be called if the directory already exists`, () => {
    const path = '../../dummy.dummy';
    const data = 'hello world';
    const spy = jest.spyOn(fs.promises, 'mkdir'); 

    return handleCreate(path, data)
      .then(res => {
        expect(spy).toHaveBeenCalledWith('foo');
      })
      .catch(err => {
        console.log(`got an error: ${err}`);
      });
  });
});
