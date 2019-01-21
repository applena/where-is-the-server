'use strict'

module.exports = function (req, res, next){
  let obj = {"name":"foo", "last":"bar"};
  res.send(obj);
}