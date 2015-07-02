var assert = require('assert');
var Models = require('../../lib/Models');

describe('lib/Models', function() {
  describe('Route', function() {
    it('should have loaded the Model objects', function() {
      assert.equal(typeof Models, 'object');
      assert.equal(typeof Models.Route, 'object');
    });
    it('should find the landing-page routes', function() {
      var group = 'landing-pages';
      Models.Route.find(group, function(err, routes_definition) {
        assert.equal(err, null);
        assert.equal(routes_definition.routes.length, 4);
      });
    });
  });
});