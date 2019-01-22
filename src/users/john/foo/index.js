'use strict'

module.exports = function (context){
  //console.log('entering foo with ', {context});

  return {"name":"foo", "last":"bar", param:context.param};
  
}