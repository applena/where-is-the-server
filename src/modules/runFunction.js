'use strict';

let parseJson = require('../modules/parseJson');

module.exports  = (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let context = {body:request.body, env:process.env, param:request.params, query:request.query};
  let userFunction = require(`./../users/${username}/${functionName}`);

  
  try {
    let output = [];
    output[0] = userFunction(context);

    Promise.all(output)
      .then( result => {

        if (parseJson(result)){ 
          response.status(200).json(result[0]);
        }
        response.status(200).send(result[0]);
      })
      .catch( e => {
        response.status(500).send('error running the function 1');
      });

  } catch (e){
    response.status(500).send('error running the function 2');
  }
 
};