const express = require('express');
const Promise = require('bluebird');
const db = require('../database/index.js');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json({strict: false}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('New post from client...\nRequest body is: ', req.body);
  github.getReposByUsername(req.body)
    .then(repos => {
      console.log(repos);
      db.save(repos);
    })
    .then(res.send(201));
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let repoCount = 0;
  db.Repo.countAsync((err, count) => {
    if (err) { console.error(err); }
    repoCount = count;
    console.log('============> count is: ', count);
    db.Repo.find()
      .sort('-watchers_count')
      .limit(25)
      .then(repos => res.status(200).send({count: count, repos: repos}));
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

