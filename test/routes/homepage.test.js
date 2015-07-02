var assert = require('assert');
var homepage = require('../../routes/homepage');

describe('routes/homepage', function() {
  it('should load the homepage routes definition', function() {
    assert.equal(typeof homepage, 'object', 'is an object');
    assert.equal(homepage.routes.length, 1, 'homepage routes definition has 1 route');
  });
});