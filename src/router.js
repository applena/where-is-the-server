'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./auth/auth-middleware');
const runFunction = require('./modules/runFunction');
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

router.get('/:username/:functionName', runFunction);

router.post('/createFunction', auth('c'), handleCreateFunction);


module.exports = router;
