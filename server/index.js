const express = require('express');
const db = require('../database/index.js');
let app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json({strict: false}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
    // $.ajax({
    //   method: 'GET',
    //   url: `https://api.github.com/users/${term.trim()}/repos`,
    //   headers: {
    //     'User-Agent': 'ephraimg'
    //     'Authorization': 'token GITHUB_TOKEN'
    //   },
    //   dataType: 'json',
    //   success: 
    // })
  console.log('New post from client...\nRequest included: ', req.query, req.params, req.body);
  res.send(201);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.Repo.find()
    .sort('-watchers_count')
    .limit(3)
    .then(repos => res.send(200, repos));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

