'use strict';

// mock the fs.promises API functions
// const fs = require('fs');
const util = require('util');

console.log('loaded the fs.js');

function readFile(file) {
  console.log('🍕🍕🍕🍕 in the mock 1 🍕🍕🍕');
  console.log(`file: ${file}`);
  if( file.match(/bad/i) ) {
    Promise.reject(new Error('error'));
  }
  else {
    Promise.resolve();
  }
}

function readDir(file) {
  console.log('🍕🍕🍕🍕 in the mock 1 🍕🍕🍕');
  if( file.match(/bad/i) ) {
    Promise.reject(new Error('error'));
  }
  else {
    Promise.resolve();
  }
}

function access(file){
  console.log('🍕🍕🍕 in the mock 1 🍕🍕🍕');
  if( file.match(/bad/i) ) {
    throw new Error('error!');
  }
  else {
    Promise.resolve();
  }
}

function writeFile(path, data){
  console.log(' 🍄 in the mock 🍄');
  Promise.resolve();
}

module.exports = {
  promises: {
    readFile: readFile,
    readDir: readDir,
    access: access,
    writeFile: writeFile,
  },
  constants: {
    F_OK: true,
    R_OK: true,
  },
};

