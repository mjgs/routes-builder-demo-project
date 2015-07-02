var assert = require('assert');
var landing_pages = require('../../routes/landing-pages');

describe('routes/landing-pages', function() {
  it('should load the landing-pages routes definition', function() {
    assert.equal(typeof landing_pages, 'object', 'is an object');
    assert.equal(landing_pages.prefix, '/landing-pages', 'prefix is /landing-pages');
    assert.equal(landing_pages.default_middleware.length, 2, '2 default middleware');
    assert.equal(landing_pages.routes.length, 4, 'landing-pages routes definition has 4 routes');
  });
});