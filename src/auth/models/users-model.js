'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const users = new mongoose.Schema({
  username: {type:String, required: true, unique:true},
  password: {type:String, required: true},
  capability: {type:[String], default:['c','u','d']},
});

users.pre('save', function(next){
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {throw new Error(error);});
});




module.exports = mongoose.model('users', users);