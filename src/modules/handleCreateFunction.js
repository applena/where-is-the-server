'use strict';

const valid_path = require('./valid_path');
const functionExists = require('./functionExists');
const handleCreate = require('./handleCreate');
const Function = require('../auth/models/functions-model');

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

module.exports = handleCreateFunction;

