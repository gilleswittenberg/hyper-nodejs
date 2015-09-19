
// requires
var request = require('koa-request');
var databaseHost = require('../lib/database.js').host;
var username = require('../lib/database.js').username;

// nodes index
module.exports = function *() {

  try {

    var body = {};

    var response = yield query(username);

    var data = response.body.results[0].data;

    // set root node
    body.id = data[0].row[1];
    body.name = data[0].row[0].name;

    body.children = yield iterate(data);

    this.body = body;

  } catch (err) {
    console.log(err);
  }
};

function *iterate (data) {

  var arr = [];

  for (var i = 0, l = data.length; i < l; i++) {
    var obj = data[i];
    var node = {
      id: obj.row[3],
      text: obj.row[2].text
    };
    var response = yield query(false, obj.row[3]);
    var data2 = response.body.results[0].data;
    node.children = yield iterate(data2);
    arr.push(node);
  }

  return arr;
}

function *query (name, id) {

  var url = databaseHost + 'db/data/transaction/commit';
  var query;
  if (name) {
    query = "MATCH (user:User {name: '" + name + "'})-->(children) RETURN user, ID(user), children, ID(children)";
  } else {
    query = "MATCH (n)-->(children) WHERE ID(n) = " + id + " RETURN n, ID(n), children, ID(children)";
  }
  var json = {
    statements: [
      {
        statement: query,
        // @TODO: Remove limit
        parameters: {limit: 9999}
      }
    ]
  };

  var options = {
      url: url,
      method: 'POST',
      json: json
  };

  try {
    return yield request(options);
  } catch (err) {

  }
}