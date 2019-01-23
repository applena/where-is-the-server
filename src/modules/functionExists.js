'use strict';

const Function = require('../auth/models/functions-model');

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

module.exports = functionExists;
