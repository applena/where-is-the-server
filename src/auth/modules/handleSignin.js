'use strict';

/**
 * @module src/auth/modules/handleSignin
 */

/**
 * Handles the user signin and send the token back to the terminal. 
 * @function handleSignin
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param {function} next Express middleware function
 */
module.exports = function(req, res, next){
  res.cookie('auth', req.token);
  res.send(req.token);
}; 