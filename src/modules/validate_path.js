'use strict';

function validator(string){
  let valid = false;

  let regex = /[^\w]/gm;
  let result = str.search(regex);
  if (result === -1){
    valid = true;
  }

  if (string.length === 0) {
    return false;
  }

  return valid;
}

// test cases:
/*
`regular_user`
`bad user`
`mischevious/user`
`bad.//user`
`bad$us#er../../../`
`../../../badu!ser`
`!@#$%^&*()'`
`../`
`/`
`..`
``
*/

module.exports = validator;
