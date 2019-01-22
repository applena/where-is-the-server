'use strict';

const util = require('util');
const express = require('express');
const router = express.Router();
const auth = require('./auth/router.js');
const fs = require ('fs');
const fsPromises = fs.promises;

// promisify fs functions
// const access = util.promisify(fs.access);
// const writeFile = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile);
// const mkdir = util.promisify(fs.mkdir);

router.get('/:username/:functionName', (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let userFunction = require(`./users/${username}/${functionName}`);
  console.log({userFunction}, 'userfunction');
  response.status(200).send(userFunction());
});


router.post('/createFunction', handleCreateFunction);
// router.post('/createFunction', asyncCall);

async function handleCreateFunction(req, res, next){
  console.log('in the createFunction post route!');

  let functionName = req.body.functionName;
  let functionCode = req.body.functionCode;
  let userName = 'betty';
  let userDirectory = `./src/users/${userName}`;
  let filePath = `./src/users/${userName}/${functionName}`;

  console.log(`req.body: ${util.inspect(req.body)}`);
  console.log(`functionName: ${functionName}`);
  console.log(`functionCode: ${req.body.functionCode}`);

  try {
    if (await fileExists(userDirectory)) {
      console.log('file exists');
    } else {
      await fsPromises.writeFile(userDirectory, fs.constants.F_OK);
      console.log('file didnot exist, so it has been created');
  
    }
  } catch (err) {
    throw err(`error on file manipulation: ${err}`);
  }

  res.status(200).send();
  console.log('end');
}

module.exports = router;


function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}

async function fileExists(path){
  try {
    await fsPromises.access(path, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}
