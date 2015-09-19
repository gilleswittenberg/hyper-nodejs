// require
var app = require('../app.js');
var request = require('co-supertest').agent(app.listen());
var should = require('should');

// tests
describe('nodes post', function () {

  it('200', function *() {
    var response = yield request.post('/nodes')
      .send({
        parentId: 1,
        text: 'string'
      })
      .expect(200)
      .end();
  });
});
