'use strict';

/**
 * 500 Middleware
 * @module src/middleware/error
 */

/**
 * Sends a JSON Formatted 500 Response
 * @param err {string} Error Text
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  console.error(err);
  res.status(500).json(error).end();
};