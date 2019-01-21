'use strict';

/**
 * Handles the user signin and send the token back to the terminal. 
 *
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param {function} next Express middleware function
 */
module.exports = function(req, res, next){
  console.log('inside signin function');
  res.cookie('auth', req.token);
  res.send(req.token);
}; 