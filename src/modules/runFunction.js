'use strict';

let parseJson = require('../modules/parseJson');

module.exports  = (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let context = {body:request.body, env:process.env, param:request.params, query:request.query};
  let userFunction = require(`./../users/${username}/${functionName}`);


  try {
    let output = userFunction(context);
  
    if (parseJson(output)){ 
      response.status(200).json(output);
    }

    response.status(200).send(output);

  } catch (e){
    response.status(500).send('error running the function');
  }
 
};