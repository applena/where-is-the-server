'use strict';

const mongoose = require('mongoose');

const functions = new mongoose.Schema({
  functionName: {type:String, required: true},
  username: {type:String, required:true},
});


module.exports = mongoose.model('functions', functions);