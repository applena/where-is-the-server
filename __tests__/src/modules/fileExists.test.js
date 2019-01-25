'use strict';

jest.mock('fs');

const fileExists = require('../../../src/modules/fileExists');

describe ('file exists', ()=> {
  it (`returns true when a file exists`, (done) => {
    const path = '/file/path/good.txt';
    fileExists(path)
      .then(res => {
        expect(res).toEqual(true);
        done();
      })
      .catch( err => {
      });
  });

  it (`returns false when a bad file path is given`, (done) => {
    const path = `./folder/folder2/dummy.js`;
    fileExists(path)
      .then(res => {
        expect(res).toEqual(false);
        done();
      })
      .catch( err => {
      });
  });

});

