'use strict';

const validator = require('../../../src/modules/valid_path');

describe('valid_path module', () => {
  it('returns false because the users path is not alphanumeric', () => {
    
    let bad = `bad$us#er../../../`; 
    let result = validator(bad);

    expect(result).toEqual(false);

  });

  it('returns true because the users path is alphanumeric', () => {
    
    let good = `regular_user`; 
    let result = validator(good);

    expect(result).toEqual(true);
  });

  it('returns false because the user doesnt have a path', () => {
    let empty = '';
    let result =  validator(empty);

    expect(result).toEqual(false);
  });

});