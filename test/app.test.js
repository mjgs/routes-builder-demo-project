var assert = require('assert');
var sinon = require('sinon');
var request = require('supertest');

describe('#app()', function() {
  var app, middleware, homepage, landing_page;
  var spy1, spy2, spy3, spy4, spy5, spy6;
  beforeEach(function() {
    app = undefined;
    app = require('../app');
    middleware = require('../middleware/middleware');
    homepage = require('../handlers/homepage');
    landing_page = require('../handlers/landing-page');

    spy1 = sinon.spy(middleware, 'middleware1');
    spy2 = sinon.spy(middleware, 'middleware2');
    spy3 = sinon.spy(middleware, 'middleware3');
    spy4 = sinon.spy(middleware, 'middleware4');
    spy5 = sinon.spy(homepage, 'mainPage');
    spy6 = sinon.spy(landing_page, 'mainPage');

  });
  afterEach(function() {
    spy1.restore();
    spy2.restore();
    spy3.restore();
    spy4.restore();
    spy5.restore();
    spy6.restore();
    app.server.close();
  });
  it('should load the homepage', function (done) {
    process.env.NODE_ENV = 'production';

    app.on('setup-complete', function () {
      request(app)
        .get('/')
        .expect(200, function() {
          assert.equal(spy1.calledOnce, true, 'middleware.middleware1 called once');
          assert.equal(spy2.calledOnce, true, 'middleware.middleware2 called once');
          assert.equal(spy3.calledOnce, true, 'middleware.middleware3 called once');
          assert.equal(spy4.calledOnce, true, 'middleware.middleware4 called once');
          assert.equal(spy5.calledOnce, true, 'homepage.mainPage handler called once');

          assert.equal(spy1.calledBefore(spy2), true, 'middleware.middleware1 called first');
          assert.equal(spy2.calledAfter(spy1), true, 'middleware.middleware1 called second');
          assert.equal(spy3.calledAfter(spy2), true, 'middleware.middleware1 called third');
          assert.equal(spy4.calledAfter(spy3), true, 'middleware.middleware1 called fourth');
          assert.equal(spy5.calledAfter(spy4), true, 'middleware.middleware1 called fifth');
          done();
        });
    });
  });
});

