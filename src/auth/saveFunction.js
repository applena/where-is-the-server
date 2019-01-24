'use strict';

const Function = require('../models/functions-model');

/**
 * @module saveFunction
 *
 * @param {string} functionName 
 * @returns function
 */
module.exports = (nameFunction) => {
  return (req, res, next) => {
    let newFunction = new Function(req.body);
    newFunction.save()
      .then((functionN) => {
        res.send(functionN);
      })
      .catch(next);

  };
};