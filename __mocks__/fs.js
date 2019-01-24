'use strict';

const util = require('util');

function readFile(file) {
  if( file.match(/bad/i) ) {
    Promise.reject(new Error('error'));
  }
  else {
    Promise.resolve();
  }
}

function readdir(path, cb) {
  if( path.match(/bad/i) ) {
    Promise.reject(new Error('error'));
  }
  else {
    Promise.resolve();
  }
}

function access(file){
  if( file.match(/dummy/i) ) {
    throw new Error('error!');
  }
  else {
    Promise.resolve();
  }
}

function writeFile(path, data){
  Promise.resolve();
}

function mkdir(path){
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

