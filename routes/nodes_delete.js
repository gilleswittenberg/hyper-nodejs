var request = require('koa-request');
var databaseHost = require('../lib/database.js').host;
var username = require('../lib/database.js').username;

module.exports = function *() {

  try {

    yield query(this.request.body.id);

    this.status = 200;

  } catch (err) {
    console.log(err);
  }
};

function *query (id) {

  var url = databaseHost + 'db/data/transaction/commit';
  var queryStr = "MATCH (n) where ID(n) = " + id + " ";
  queryStr +=    "OPTIONAL MATCH (n)-[r]-() ";
  queryStr +=    "DELETE n, r";

  var json = {
    statements: [
      {
        statement: queryStr
      }
    ]
  };

  var options = {
    url: url,
    method: 'POST',
    json: json
  };

  return yield request(options);
}
