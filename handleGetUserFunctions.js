'use strict';

const fs = require('fs');

/**
 * Asynchronous. Performs fs.readdir on the user's directory. If no directory exists, next() is called with 'Resource not found', otherwise returns a comma separated list of function names.
 * @function handleGetUserFunctions
 * @param req
 * @param res
 * @param next
 */
function handleGetUserFunctions(req, res, next){
  let username = req.params.username;
  let path = `${process.cwd()}/src/users/${username}`;

  fs.readdir(path, (err, files) => {
    if (err){
      next('Resource not found');
    } else {
      res.status(200).send(`Functions: ${files}`);
    }
  });
}

module.exports = handleGetUserFunctions;
