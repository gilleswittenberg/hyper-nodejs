
var runQuery = require('../lib/run_query.js');

module.exports = function *(id) {

  try {

    yield query(id);

    this.type = 'json';
    this.status = 200;
    this.body = '';

  } catch (err) {
    console.log(err);
  }
};

function *query (id) {

  var queryStr = "MATCH (n) where ID(n) = " + id + " ";
  queryStr +=    "OPTIONAL MATCH (n)-[r]-() ";
  queryStr +=    "DELETE n, r";

  return yield runQuery(queryStr);
}
