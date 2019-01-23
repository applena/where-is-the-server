'use strict';

const fs = require ('fs');
const fileExists = require('./fileExists');

/**
 * Asynchronous. Given a path and data, creates a file or directory if it does not exist.  If a file does exist, over-write it with the data provided. Determines whether the path is a file or directory based on whether the function is invoked with a data parameter.
 * @function handleCreate
 * @param string path
 * @param string data
 */
async function handleCreate(path, data){
  console.log('in handleCreate');
  if (data){
    await fs.promises.writeFile(path, data);
  }
  
  if ( await !fileExists(path)) {
    if(data){
      await fs.promises.writeFile(path, data);
      console.log(`file ${path} didn't exist, so it has been created`);
    } else {
      await fs.promises.mkdir(path);
      console.log(`directory ${path} didn't exist, so it has been created`);
    }
  }

}

module.exports = handleCreate;
