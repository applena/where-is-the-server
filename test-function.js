'use strict';

const superagent = require('superagent');

module.exports = function(){

  let url = 'https://swapi.co/api/people/';

  return superagent.get(url)
    .then( (res) => {
      let peopleArr = res.body.results;
      let urls = peopleArr.map( (val) => {
        let url = val.url;
        return url;
      });
      return urls;
    })
    .then( (urls) => {
      const promiseArr = []; 
      for( let i = 0; i < urls.length; i++){
        promiseArr.push(superagent.get(urls[i]));
      }
      return Promise.all(promiseArr);
    })
    .then( (results) => {
      let namesArr = results.map( person => {
        return person.body.name;
      });

      return namesArr;
    })
    .catch( (err) => {throw err;});
};
