'use strict';

const app = require ('../../../src/app.js');
const util = require('util');

describe ('get user functions from file system', ()=> {

  it (`starts the server when start function is called`, () => {
    const spy = jest.spyOn(app.app, 'listen');
    app.start();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

});