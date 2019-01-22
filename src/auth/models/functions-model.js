'use strict';

const mongoose = require('mongoose');
require('./users-model');

const functions = new mongoose.Schema({
  functionName: {type:String, required: true, unique:true},
});
// { toObject:{virtuals:true}, toJSON:{virtuals:true} }
// functions.virtual('users', {
//   ref: 'users',
//   localField: 'user_id',
//   foreignField: '_id',
//   justOne:false,
// });

module.exports = mongoose.model('functions', functions);