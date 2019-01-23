'use strict';

const util = require('util');
const express = require('express');
const router = express.Router();
const auth = require('./auth/auth-middleware');
const fs = require ('fs');
const fsPromises = fs.promises;
const parseJson = require('./modules/parseJson');
const Function = require('./auth/models/functions-model');
const valid_path = require('./modules/valid_path');
const User = require('./auth/models/users-model');
require('mongoose');

router.get('/getOne', auth('r'), function(req, res, next) {
  let query = {_id:req.user._id};
  User.find(query)
    .then(u => {
      res.status(200).json(u);
    })
    .catch(next);
});

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

router.post('/createFunction', auth('c'), handleCreateFunction);

async function functionExists(user, functionName){
  let query = {
    username: user.username,
    functionName: functionName,
  };
  
  return Function.find(query)
    .then( bool => {
      if (!bool.length){
        return false;
      } else {
        return true;
      }
    })
    .catch( e => e);
}

/**
 * Asynchronous. Create function handler. Normalizes function name and creates the corresponding user directory, function directory, and function file. 
 * @function handleCreateFunction
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function handleCreateFunction(req, res, next){
  let functionName = req.body.functionName;
  let functionCode = req.body.functionCode;
  let userName = req.user.username;

  if( !valid_path(functionName) ) {
    next('Invalid function name');
    return;
  }

  if( await functionExists(req.user, functionName)){
    next('No duplicate functions allowed');
    return;
  }

  let dbObj = {functionName:functionName, username:userName};

  let userDirectory = `./src/users/${userName}`;
  let functionDirectory = `./src/users/${userName}/${functionName}`;
  let functionFile = `./src/users/${userName}/${functionName}/index.js`;

  let newFunction = new Function(dbObj);

  newFunction.save()
    .then((functionN) => {
      async function runThemAll(){

        await handleCreate(userDirectory);
        await handleCreate(functionDirectory);
        await handleCreate(functionFile, functionCode);
      
        res.status(200).send();

      }
      runThemAll();
    })
    .catch(next);

}

/**
 * Asynchronous. Returns true if the path given exists, and false if it does not. 
 * @function fileExists
 * @param string path
 */
async function fileExists(path){
  try {
    await fsPromises.access(path, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Asynchronous. Given a path and data, creates a file or directory if it does not exist.  If a file does exist, over-write it with the data provided. Determines whether the path is a file or directory based on whether the function is invoked with a data parameter.
 * @function handleCreate
 * @param string path
 * @param string data
 */
async function handleCreate(path, data){
  console.log('in handleCreate');
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

/**
 * Asynchronous. Performs fs.readdir on the user's directory. If no directory exists, next() is called with 'Resource not found', otherwise returns a comma separated list of function names.
 * @function handleGetUserFunctions
 * @param req
 * @param res
 * @param next
 */
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
