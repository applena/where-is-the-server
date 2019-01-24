'use strict';

jest.mock('fs');
const fs = require('fs');
const handleGetUserFunctions = require('../../../src/modules/handleGetUserFunctions');

describe ('get user functions from file system', ()=> {

  it (`returns an array of user functions`, () => {
    let expectedPath = `${process.cwd()}/src/users/john`;
    const req = {
      params: {
        username: 'john',
      },
    };
    
    const res = {};
    const next = function() {};
    const spy = jest.spyOn(fs, 'readdir');

    handleGetUserFunctions(req, res, next);

    expect(spy).toHaveBeenCalledWith(expectedPath, expect.any(Function));
  });

});

