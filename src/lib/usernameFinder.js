'use strict';

/**
 * Model Finder Middleware
 * @module lib/usernameFinder
 */

/**
 * Model Finder
 * Evaluates req.params.model (i.e. /:username/) and returns an instance of the specified model.
 * Because node require is cached, the instance will only be created once, no matter how many times a model is called for.
 * In the event the model is not found, node will throw a "MODULE_NOT_FOUND" error which the error middleware in the server will pick up.
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
module.exports = (req,res,next) => {
  console.log('entering usernameFiner');
  let username = req.params.username;
  req.username = username;
  next();
};

//req.username = require(`../models/${modelName}/${modelName}-model.js`);
//let username = req.params.username.replace(/[^a-z0-9-_]/gi, '');
