
'use strict';
const parseJson = require('../../../src/modules/parseJson');

describe('parseJson() ', () => {
  it('returns false if the function return is a valid json object', ()=>{
    const obj = {
      'name': 'caity',
      'age': 26,
      'cars': 'BMW',
      'dog': 'Mabel',
    };
    const bool = parseJson(obj);

    expect(bool).toEqual(false);
  });

  it('returns true is the function return is an invalid json object', () => {
    const obj = {
      'name': 'caity',
      'age': 26,
      'cars': 'BMW',
      'dog': 'Mabel',
    };
    const bool = parseJson(JSON.stringify(obj));
    expect(bool).toEqual(true);
  });

});