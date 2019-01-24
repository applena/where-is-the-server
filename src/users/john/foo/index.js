'use strict';

module.exports = (context) => {
  
  let a = parseInt(context.body.asdf);
  let b = parseInt(context.body.b);
  return a+b;

};