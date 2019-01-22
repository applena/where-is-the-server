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

async function handleCreateFunction(req, res, next){
  let functionName = req.body.functionName;
  let functionCode = req.body.functionCode;
  let userName = 'betty';

  let userDirectory = `./src/users/${userName}`;
  let functionDirectory = `./src/users/${userName}/${functionName}`;
  let functionFile = `./src/users/${userName}/${functionName}/index.js`;

  console.log(`req.body: ${util.inspect(req.body)}`);
  console.log(`functionName: ${functionName}`);
  console.log(`functionCode: ${req.body.functionCode}`);


  if (await fileExists(userDirectory) !== true) {
    try {
      await fsPromises.mkdir(userDirectory);
      console.log(`directory didn't exist, so it has been created`);
    } catch (err) {
      console.log(`error on directory creation: ${err}`);
    }
  } else {
    console.log(`${userDirectory} exists, doing nothing`);
  }
  
  if (await fileExists(functionDirectory) !== true) {
    try {
      await fsPromises.mkdir(functionDirectory);
      console.log(`directory didn't exist, so it has been created`);
    } catch (err) {
      console.log(`error on directory creation: ${err}`);
    }
  } else {
    console.log(`${functionDirectory} exists, doing nothing`);
  }

  if (await fileExists(functionFile) !== true) {
    try {
      await fsPromises.writeFile(functionFile, functionCode);
      console.log(`file didn't exist, so it has been created`);
    } catch (err) {
      console.log(`error on file write: ${err}`);
    }
  } else {
    console.log(`${functionFile} exists, doing nothing`);
  }
  res.status(200).send();
  console.log('end');
}

async function fileExists(path){
  try {
    await fsPromises.access(path, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = router;




