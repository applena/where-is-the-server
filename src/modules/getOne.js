'use strict';

let User = require('../../src/auth/models/users-model');

module.exports = function(req, res, next) {
  let query = {_id:req.user._id};
  User.find(query)
    .then(u => {
      res.status(200).json(u);
    })
    .catch(next);
};