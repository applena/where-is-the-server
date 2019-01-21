'use strict';

/**
 * Model Finder Middleware
 * @module lib/funcationNameFinder
 * 
 */

/**
 * Model Finder
 * Evaluates req.params.model (i.e. /:model/) and returns an instance of the specified model.
 * Because node require is cached, the instance will only be created once, no matter how many times a model is called for.
 * In the event the model is not found, node will throw a "MODULE_NOT_FOUND" error which the error middleware in the server will pick up.
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
module.exports = (req,res,next) => {
  let functionName = req.params.functionName;
  req.functionName = functionName;
  //req.model = require(`../models/${modelName}/${modelName}-model.js`);
  next();
};
