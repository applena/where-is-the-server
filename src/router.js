'use strict'

const express = require('express');
const router = express.Router();
const usernameFinder = require('./lib/usernameFinder.js');
const functionNameFinder = require('./lib/functionNameFinder.js');


router.param('username', usernameFinder);
router.param('functionName', functionNameFinder);

router.get('/:username/:functionName', require(`./users/${req.username}/${req.functionName}`));

// router.get('/:username/:functionName', getFunction);

// function getFunction(req, res, next){
//   console.log('entering the getFunction', 'request params =', req.params);
//   let username = req.params.username;
//   let functionName = req.params.functionName;
//   require(`./users/${username}/${functionName}`);
// }

module.exports = router;
