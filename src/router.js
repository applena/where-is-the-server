'use strict';

const util = require('util');
const express = require('express');
const router = express.Router();
const auth = require('./auth/router.js');
const fs = require ('fs');
const fsPromises = fs.promises;
const parseJson = require('./modules/parseJson');

// get all the functions for a user
router.get('/functions/:username/', handleGetUserFunctions);

router.get('/:username/:functionName', (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let context = {body:request.body, env:process.env, param:request.params, query:request.query};
  let userFunction = require(`./users/${username}/${functionName}`);
  //console.log({context}, 'context');
  
  let output = parseJson(userFunction(context));

  if (output){ response.status(200).json(userFunction(context)); } 
  else { response.status(200).send(userFunction(context)); }
 
});

// TODO: add auth
router.post('/createFunction', handleCreateFunction);

async function handleCreateFunction(req, res, next){
  let functionName = req.body.functionName;
  let functionCode = req.body.functionCode;
  // let userName = req.body.userName; //needs to be attached to the request by the auth middleware
  let userName = 'betty';

  let userDirectory = `./src/users/${userName}`;
  let functionDirectory = `./src/users/${userName}/${functionName}`;
  let functionFile = `./src/users/${userName}/${functionName}/index.js`;

  // console.log(`req.body: ${util.inspect(req.body)}`);
  // console.log(`functionName: ${functionName}`);
  // console.log(`functionCode: ${req.body.functionCode}`);

  await handleCreate(userDirectory);
  await handleCreate(functionDirectory);
  await handleCreate(functionFile, functionCode);

  res.status(200).send();
}

// returns true if the path given exists, otherwise false
async function fileExists(path){
  try {
    await fsPromises.access(path, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// creates a file or directory if it does not exist
// if a file exists, over-write it with the data provided
async function handleCreate(path, data){

  if (data){
    await fsPromises.writeFile(path, data);
  }
  
  if (await fileExists(path) === true) {
    if(data){
      await fsPromises.writeFile(path, data);
      console.log(`file ${path} exists, and it has been over-written`);
    } else {
      console.log(`directory ${path} exists, doing nothing`);
    }
  } else {
    if(data){
      await fsPromises.writeFile(path, data);
      console.log(`file ${path} didn't exist, so it has been created`);
    } else {
      await fsPromises.mkdir(path);
      console.log(`directory ${path} didn't exist, so it has been created`);
    }
  }

}

// get a users functions, returns a comma separated list of function names
function handleGetUserFunctions(req, res, next){
  let username = req.params.username;
  let path = `${process.cwd()}/src/users/${username}`;

  fs.readdir(path, (err, files) => {
    if (err){
      next('Resource not found');
    } else {
      res.status(200).send(`Functions: ${files}`);
    }
  });

}

module.exports = router;
