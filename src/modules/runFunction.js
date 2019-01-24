'use strict';

let parseJson = require('../modules/parseJson');

module.exports  = (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let context = {body:request.body, env:process.env, param:request.params, query:request.query};
  let userFunction = require(`./../users/${username}/${functionName}`);
  
  let output = parseJson(userFunction(context));

  if (output){ response.status(200).json(userFunction(context)); } 
  else { response.status(200).send(userFunction(context)); }
 
};