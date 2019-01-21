'use strict'

const express = require('express');
const router = express.Router();
// const usernameFinder = require('./lib/usernameFinder.js');
// const functionNameFinder = require('./lib/functionNameFinder.js');


// router.param('username', usernameFinder);
// router.param('functionName', functionNameFinder);

//router.get('/:username/:functionName', require(`./users/${req.params.username}/${req.params.functionName}`));

router.get('/:username/:functionName', (request, response, next) => {
  let username=request.params.username;
  let functionName=request.params.functionName;
  let userFunction = require(`./users/${username}/${functionName}`);
  userFunction(request, response, next);
});

// router.get('/:username/:functionName', getFunction);

// function getFunction(req, res, next){



//   // req.username.get()
//   // .then( data => {
//   //   const output = {
//   //     count: data.length,
//   //     results: data,
//   //   };
//   //   response.status(200).json(output);
//   // })
//   // .catch( next );


//   console.log('entering the getFunction', 'request params =', req.params);
//   // let username = req.params.username;
//   // let functionName = req.params.functionName;
//   // require(`./users/${username}/${functionName}`);
// }

module.exports = router;
