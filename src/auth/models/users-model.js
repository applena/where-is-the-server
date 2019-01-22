'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const users = new mongoose.Schema({
  username: {type:String, required: true, unique:true},
  password: {type:String, required: true},
  capability: {type:[String], default:['c','r','u','d']},
});

users.pre('save', function(next){
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {throw new Error(error);});
});

users.statics.authenticateBasic = function(auth){
  console.log('inside authenticate basic', auth);
  let query = {username: auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => {throw error;} );
};

users.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password)
    .then(bool => bool ? this : null);
};

users.statics.authenticateToken = function(token){

  try{
    let parsedToken = jwt.verify(token, SECRET);
    console.log(parsedToken);
    let query = {_id: parsedToken.id};
    console.log('token passsed');
    return this.findOne(query);
  }
  catch(e){
    throw new Error('Invalid token');
  }

};

users.methods.generateToken = function(type){
  
  let token = {
    id: this._id,
    capability:this.capability,
  };

  return jwt.sign(token, SECRET);
};

users.methods.can = function(capability){

  return this.capability.includes(capability);
};



module.exports = mongoose.model('users', users);