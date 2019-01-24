'use strict';

// const fs = require('fs');
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

function readdir(path, cb) {
  console.log('🍕🍕🍕🍕 in the mock readdir 🍕🍕🍕');
  if( path.match(/bad/i) ) {
    console.log('match on bad')
    Promise.reject(new Error('error'));
  }
  else {
    Promise.resolve();
  }
}

function access(file){
  console.log('🍕🍕🍕 in the mock 1 🍕🍕🍕');
  if( file.match(/dummy/i) ) {
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

function mkdir(path){
  console.log(' 🍄 in the mock 🍄');
  Promise.resolve();
}

module.exports = {
  readFileSync: ()=> {},
  existSync: ()=> {},
  readdir: readdir,
  promises: {
    readFile: readFile,
    readdir: readdir,
    access: access,
    writeFile: writeFile,
    mkdir: mkdir,
  },
  constants: {
    F_OK: true,
    R_OK: true,
  },
};

