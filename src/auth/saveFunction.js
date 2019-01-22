'use strict';

const Function = require('../models/functions-model');

module.exports = (nameFunction) => {
  return (req, res, next) => {
    console.log('hello');
    //let functionName = nameFunction.toLowerCase();
    let newFunction = new Function(req.body);
    console.log('in saveFuction', newFunction);
  
    newFunction.save()
      .then((functionN) => {
        console.log('almost there', functionN);
        res.send(functionN);
      })
      .catch(next);

  };
};