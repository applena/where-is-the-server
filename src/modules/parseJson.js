'use strict';


/**
 * Determines whether the return from the stored function is a JSON object or otherwise. If it is a JSON object it returns true, else it returns false
 * @module src/modules/parseJson
 * @param obj
 * @returns boolean
 */
module.exports = function(obj){
  try{
    JSON.parse(obj);
  } 
  catch(e){
    return false;
  }
  return true;
};

