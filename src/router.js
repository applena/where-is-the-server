'use strict'

const express = require('express');
const router = express.Router();

router.get('/:username/:functionName', (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let userFunction = require(`./users/${username}/${functionName}`);
  console.log({userFunction}, 'userfunction');
  response.status(200).send(userFunction());
});


module.exports = router;
