// require
var app = require('../app.js');
var request = require('co-supertest').agent(app.listen());
var should = require('should');

// tests
describe('nodes delete', function () {

  it('200', function *() {
    // @TODO: This is dangerous running against a live database
    var response = yield request.delete('/nodes/999999999')
      .expect('Content-Type', /json/)
      .expect(200)
      .end();
  });
});
