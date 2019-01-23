'use strict';

const fs = require ('fs');

/**
 * Asynchronous. Returns true if the path given exists, and false if it does not. 
 * @function fileExists
 * @param string path
 */
async function fileExists(path){
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = fileExists;
