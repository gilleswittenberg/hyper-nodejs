// require
var app = require('../app.js');
var request = require('co-supertest').agent(app.listen());
var should = require('should');

// tests
describe('nodes delete', function () {

  it('200', function *() {
    var response = yield request.delete('/nodes')
      .send({
        // @TODO: This is dangerous running against a live database
        id: 999999999,
      })
      .expect(200)
      .end();
  });
});
