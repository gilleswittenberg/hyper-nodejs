// require
var app = require('../app.js');
var request = require('co-supertest').agent(app.listen());
var should = require('should');

// tests
describe('nodes index', function () {

  it('200', function *() {
    var response = yield request.get('/nodes')
      .expect(200)
      .end();

    response.body.id.should.not.be.undefined;
    response.body.name.should.not.be.undefined;
  });
});
