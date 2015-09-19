var runQuery = require('../lib/run_query.js');

module.exports = function *() {

  try {

    yield query(this.request.body.parentId, this.request.body.text);

    this.status = 200;

  } catch (err) {
    console.log(err);
  }
};

function *query (parentId, text) {

  var queryStr = "MATCH (n) WHERE ID(n) = " + parentId + " ";
  queryStr +=    "CREATE (node:Text {text: '" + text + "'})<-[r:Child]-(n) RETURN node, ID(node)";

  return yield runQuery(queryStr);
}
