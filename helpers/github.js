const requestAsync = require('request-promise');
const config = require('../config.js'); 

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request-promise',
      'Authorization': `token ${config.GITHUB_TOKEN}`
    },
    json: true
  };

  return requestAsync(options);
    // .then(repos => console.log(repos))
    // .catch(err => console.error(err));

};

module.exports.getReposByUsername = getReposByUsername;