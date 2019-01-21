'use strict';

const User = require('./models/users-model');

module.exports = (capability) => {
  return (req, res, next) => {
  
    try{
   
      let [authType, authString] = req.headers.authorization.split(/\s+/);
      console.log(authType);


      switch(authType.toLowerCase()) {

      case 'basic':
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }
    }
    catch(e){
      _authError();
    }

    function _authBasic(str){
      let base64buffer = Buffer.from(str, 'base64');
      let bufferString = base64buffer.toString();

      let [username, password] = bufferString.split(':');
      let auth = {username, password};
      console.log(auth);

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    function _authBearer(authString){
      console.log('inside authbearer');
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    function _authenticate(user){
      if( user && (!capability || (user.can(capability)))){
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else{ _authError(); }
    }

    function _authError(){
      next('Resource not found');
    }

  };
};