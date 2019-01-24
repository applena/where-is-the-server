'use strict';

const Function = require('../auth/models/functions-model');

async function functionExists(user, functionName){
  let query = {
    username: user.username,
    functionName: functionName,
  };
  
  return Function.find(query)
    .then( bool => !!bool.length)
    .catch( e => console.error);
}

module.exports = functionExists;
