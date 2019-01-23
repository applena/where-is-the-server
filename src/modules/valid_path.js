'use strict';
/**
 * Determines whether a string is valid for file paths
 * @module src/modules/valid_path
 * @param string
 * @returns boolean
 */
function validator(string){
  let valid = false;

  let regex = /[^\w]/gm;
  let result = string.search(regex);
  if (result === -1){
    valid = true;
  }

  if (string.length === 0) {
    return false;
  }

  return valid;
}

module.exports = validator;
