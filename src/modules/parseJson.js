'use strict';


module.exports = function(obj){
  try{
    JSON.parse(obj);
  } 
  catch(e){
    return false;
  }
  return true;
};

