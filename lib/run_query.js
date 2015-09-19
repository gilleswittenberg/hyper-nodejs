
// requires
var databaseHost = require('../lib/database.js').host;
var request = require('koa-request');


module.exports = function *(query, parameters) {

  var url = databaseHost + 'db/data/transaction/commit';
  var json = {
    statements: [
      {
        statement: query,
        parameters: parameters
      }
    ]
  };
  var options = {
      url: url,
      method: 'POST',
      json: json
  };

  return yield request(options);
};
