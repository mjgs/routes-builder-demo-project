var assert = require('assert');
var sinon = require('sinon');
var request = require('supertest');

var middleware = require('../middleware/middleware');
var homepage = require('../handlers/homepage');
var landing_pages = require('../handlers/landing-pages');

describe('#app()', function() {
  var app;
  var spy1, spy2, spy3, spy4, spy5, spy6, spy7;
  this.timeout(5000);

  before(function(done) {
    spy1 = sinon.spy(middleware, 'middleware1');
    spy2 = sinon.spy(middleware, 'middleware2');
    spy3 = sinon.spy(middleware, 'middleware3');
    spy4 = sinon.spy(middleware, 'middleware4');
    spy5 = sinon.spy(homepage, 'mainPage');
    spy6 = sinon.spy(landing_pages, 'first_lp');
    spy7 = sinon.spy(landing_pages, 'another_lp');

    process.env.NODE_ENV = 'development';
    app = require('../app');
    app.on('setup-complete', function () {
      console.log('heard setup-complete event');
      done();
    });
  });
  afterEach(function() {
    spy1.reset();
    spy2.reset();
    spy3.reset();
    spy4.reset();
    spy5.reset();
    spy6.reset();
    spy7.reset();
  });
  after(function() {
    spy1.restore();
    spy2.restore();
    spy3.restore();
    spy4.restore();
    spy5.restore();
    spy6.restore();
    spy7.restore();
    app.server.close();
    app = undefined;
  });
  it('should load the homepage', function (done) {
    request(app)
      .get('/')
      .expect(200, function() {
        assert.equal(spy3.calledOnce, true, 'middleware.middleware3 called once');
        assert.equal(spy4.calledOnce, true, 'middleware.middleware4 called once');
        assert.equal(spy5.calledOnce, true, 'homepage.mainPage handler called once');

        assert.equal(spy3.calledBefore(spy4), true, 'middleware.middleware3 called first');
        assert.equal(spy4.calledAfter(spy3), true, 'middleware.middleware4 called second');
        assert.equal(spy5.calledAfter(spy4), true, 'homepage.mainPage handler called last');
        done();
      });
  });
  it.skip('should load the first landing-page', function (done) {
    request(app)
      .get('/landing-pages/first-landing-page')
      .expect(200, function() {
        assert.equal(spy1.calledOnce, true, 'middleware.middleware1 called once');
        assert.equal(spy2.calledOnce, true, 'middleware.middleware2 called once');
        assert.equal(spy3.calledOnce, true, 'middleware.middleware3 called once');
        assert.equal(spy4.calledOnce, true, 'middleware.middleware4 called once');
        assert.equal(spy6.calledOnce, true, 'landing-pages.first_lp handler called once');

        assert.equal(spy1.calledBefore(spy2), true, 'middleware.middleware1 called first');
        assert.equal(spy2.calledAfter(spy1), true, 'middleware.middleware2 called second');
        assert.equal(spy3.calledAfter(spy2), true, 'middleware.middleware3 called third');
        assert.equal(spy4.calledAfter(spy3), true, 'middleware.middleware4 called fourth');
        assert.equal(spy6.calledAfter(spy4), true, 'landing-pages.first_lp handler called fifth');
        done();
      });
  });
  it.skip('should load the another landing-page', function (done) {
    request(app)
      .get('/landing-pages/another-landing-page')
      .expect(200, function() {
        assert.equal(spy1.calledOnce, true, 'middleware.middleware1 called once');
        assert.equal(spy2.calledOnce, true, 'middleware.middleware2 called once');
        assert.equal(spy3.calledOnce, true, 'middleware.middleware3 called once');
        assert.equal(spy4.calledOnce, true, 'middleware.middleware4 called once');
        assert.equal(spy7.calledOnce, true, 'landing-pages.another_lp handler called once');

        assert.equal(spy1.calledBefore(spy2), true, 'middleware.middleware1 called first');
        assert.equal(spy2.calledAfter(spy1), true, 'middleware.middleware2 called second');
        assert.equal(spy3.calledAfter(spy2), true, 'middleware.middleware3 called third');
        assert.equal(spy4.calledAfter(spy3), true, 'middleware.middleware4 called fourth');
        assert.equal(spy7.calledAfter(spy4), true, 'landing-pages.another_lp handler called fifth');
        done();
      });
  });
  it('should load the 404 error page', function (done) {
    request(app)
      .get('/path/to/non/existent/page')
      .expect(404, done());
  });
  it('should load the 500 error page with error status in development mode', function (done) {
    request(app)
      .get('/throw-error')
      .expect(500, function(err, res) {
        assert.equal(res.status, 500, 'res.status is 500');
        done();
      });
  });
  it('should load the 500 error page without error status in production mode', function (done) {
    app.server.close();
    app.server.on('close', function() {
      setTimeout(function() {
        // Start the app in production mode
        process.env.NODE_ENV = 'production';
        app.server = app.listen(app.get('port'), function() {
          console.log('Starting landing-pages - Listening on port ' + app.server.address().port);
        });
        request(app)
          .get('/throw-error')
          .expect(500, function(err, res) {
            assert.equal(res.status, 500, 'res.status is 500');
            done();
          });
      }, 1000);
    });
  });
});