'use strict'

module.exports = function (req, res, next){
  console.log('entering foo');
  console.log(req.body, 'req');
  let obj = {"name":"foo", "last":"bar"};
  res.status(200);
}