'use strict';

jest.mock('fs');

const fileExists = require('../../../src/modules/fileExists');

describe ('file exists', ()=> {
  it (`returns true when a file exists`, () => {
    const path = '/file/path/good.txt';
    fileExists(path)
      .then(res => {
        expect(res).toEqual(true);
      })
      .catch( err => {
      });
  });

  it (`returns false when a bad file path is given`, () => {
    const path = `./folder/folder2/dummy.js`;
    fileExists(path)
      .then(res => {
        expect(res).toEqual(false);
      })
      .catch( err => {
      });
  });

});

