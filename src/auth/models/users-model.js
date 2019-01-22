'use strict';

/**
 * 
 * @module src/auth/models/users-model
 *
 */

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

/**
 * Verifies that the basic authentication passed in matches that of the user in the database. 
 * 
 * @method authenticateBasic
 *
 * @param auth {string} Basic Auth Token
 * @returns user
 */
users.statics.authenticateBasic = function(auth){
  console.log('inside authenticate basic', auth);
  let query = {username: auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => {throw error;} );
};

/**
 * Verifies that the password passed in is the same as the encrypted password associated with the user. 
 * @method comparePassword
 *
 * @param password {string} user password
 * @returns boolean
 */
users.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password)
    .then(bool => bool ? this : null);
};

/**
 * Verifies if the bearer token passed in is associated with a user in the database.
 * @method authenticateToken
 * 
 * @param token {string} Bearer Token
 * @returns id 
 */
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

/**
 * Generates a bearer token and assigns it to the user. 
 * 
 * @method generateToken
 *
 * @param string type
 * @returns
 */
users.methods.generateToken = function(type){
  
  let token = {
    id: this._id,
    capability:this.capability,
  };

  return jwt.sign(token, SECRET);
};


/**
 * Verifies that the user has the CRUD capability they are trying to access. 
 *
 * @param string capabililty
 * @returns boolean
 */

users.methods.can = function(capability){

  return this.capability.includes(capability);
};



module.exports = mongoose.model('users', users);