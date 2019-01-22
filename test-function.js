'use strict';

const superagent = require('superagent');

module.exports = function(){

  const url = 'https://swapi.co/api/people/';
  
  let peopleURLs;
  
  superagent.get(url)
    .then( (result) => {
      // console.log(result.body);
      peopleURLs = result.body.results.map( (person) => {
        return person.url;
      });
      // console.log(peopleURLs);
      const promiseArr = [];
      for(let i = 0; i < peopleURLs.length; i++){
        promiseArr.push(superagent.get(peopleURLs[i]));
      }
      // let result = [];
      Promise.all(promiseArr)
        .then( (result) => {
          for(let i = 0; i < result.length; i++){
            console.log(result[i].body.name);
          }
        });
    });
};
