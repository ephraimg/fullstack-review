const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));
mongoose.connectAsync('mongodb://localhost/fetcher');
const db = mongoose.connection;

const sampleData = require('../data.json');

// in docs, why using bind here?
db.onAsync('error', console.error.bind(console, 'error connecting mongoose...'));
db.onceAsync('open', console.log.bind(console, 'successfully connected mongoose!'));

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true, dropDups: true},
  name: String,
  owner_id: String,
  avatar_url: String,
  html_url: String,
  watchers_count: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let makeRecord = repo => {
  let record = new Repo({
    id: repo.id,
    name: repo.name,
    owner_id: repo.owner.id,
    avatar_url: repo.owner.avatar_url,
    html_url: repo.html_url,
    watchers_count: repo.watchers_count,
    forks_count: repo.forks_count
  });
  return record;
};

let save = repos => {
  // put single repo in an array if not already
  let records = [].concat(repos);
  console.log('----------------> records: ', records);
  records = records.map(repo => makeRecord(repo));
  let promises = [];
  records.forEach(record => {
    promises.push(record.saveAsync());
  });
  return Promise.all(promises)
    .then(results => results)
    .catch(err => fs.appendFile('errorLog.txt', 
      `Error at db index.js 48: ${err}`), err => console.error(err));
}

// save(sampleData)
//   .then(results => console.log(`Saved ${results.length} mongoose records!`));

module.exports.save = save;
module.exports.Repo = Repo;