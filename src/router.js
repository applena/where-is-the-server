'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./auth/auth-middleware');
const parseJson = require('./modules/parseJson');
const User = require('./auth/models/users-model');

const handleCreateFunction = require('./modules/handleCreateFunction');
const handleGetUserFunctions = require('./modules/handleGetUserFunctions');

require('mongoose');

router.get('/getOne', auth('r'), function(req, res, next) {
  let query = {_id:req.user._id};
  User.find(query)
    .then(u => {
      res.status(200).json(u);
    })
    .catch(next);
});

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

module.exports = router;
