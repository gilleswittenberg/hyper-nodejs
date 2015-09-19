var request = require('koa-request');
var databaseHost = require('../lib/database.js').host;
var username = require('../lib/database.js').username;

module.exports = function *() {

  try {

    yield query(this.request.body.parentId, this.request.body.text);

    this.status = 200;

  } catch (err) {
    console.log(err);
  }
};

function *query (parentId, text) {

  var url = databaseHost + 'db/data/transaction/commit';
  var queryStr = "MATCH (n) WHERE ID(n) = " + parentId + " ";
  queryStr +=    "CREATE (node:Text {text: '" + text + "'})<-[r:Child]-(n) RETURN node, ID(node)";

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
