'use strict'

const express = require('express');
const router = express.Router();

router.get('/:username/:functionName', (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let context = {body:request.body, env:process.env, param:request.params, query:request.query};
  let userFunction = require(`./users/${username}/${functionName}`);
  //console.log({context}, 'context');
  
  response.status(200).send(userFunction(context));
});


module.exports = router;
