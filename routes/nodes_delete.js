
var runQuery = require('../lib/run_query.js');

module.exports = function *() {

  try {

    yield query(this.request.body.id);

    this.status = 200;

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
