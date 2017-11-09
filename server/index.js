const express = require('express');
const Promise = require('bluebird');
const db = require('../database/index.js');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');

// To set environment variables
var dotenv = require('dotenv')
dotenv.config();
dotenv.load();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json({strict: false}));

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body)
    .then(repos => {
      return db.save(repos);
    })
    .then(results => res.status(201).send(results));
});

app.get('/repos', function (req, res) {
  let repoCount = 0;
  db.Repo.countAsync((err, count) => {
    if (err) { console.error(err); }
    repoCount = count;
    db.Repo.find()
      .sort('-watchers_count')
      .limit(25)
      .then(repos => res.status(200).send({count: count, repos: repos}));
  });
});

let port = process.env.PORT;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

