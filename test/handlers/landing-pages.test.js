var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var Models = require('../../lib/Models');
var handlers = rewire('../../handlers/landing-pages');

describe('handlers/landing-pages', function() {
  var revert, ModelsMock;
  beforeEach(function() {
    ModelsMock = {
      Route: {
        find: function(routes_name, cb) {
          var routes_definition = {
            routes: [
              [ 'get' , '/'                    , [ 'middleware.middleware3', 'middleware.middleware4' ], 'landing-pages.index'           ],
              [ 'get' , '/first-landing-page'  , [ 'middleware.middleware3', 'middleware.middleware4' ], 'landing-pages.first_lp'        ],
              [ 'get' , '/another-landing-page', [ 'middleware.middleware3', 'middleware.middleware4' ], 'landing-pages.another_lp'      ],
              [ 'get' , '/online-services'     , [ ]                                                   , 'landing-pages.online_services' ]
            ]
          };
          cb(null, routes_definition);
        }
      }
    };
    revert = handlers.__set__('Models', ModelsMock);
  });
  afterEach(function() {
    revert();
  });

  describe('landing-pages.index(req, res)', function() {
    it('should render the landing-pages/index view with retrieved route definition data', function() {
      var req = function() {};
      var res = { render: function() {}};
      var spy = sinon.spy(res, 'render');
      var route_names = [
        'first-landing-page',
        'another-landing-page',
        'online-services'
      ];
      spy.withArgs('landing-pages/index', { pages: route_names });
      handlers.index(req, res);
      assert.equal(spy.calledOnce, true, 'res.render called once');
      assert(spy.withArgs('landing-pages/index', { pages: route_names }).calledOnce, 'res.render was called once with expected data to render landing-pages/index view');
    });
    it('should render the error view with error data', function() {
      ModelsMock.Route.find = function(routes_name, cb) {
        cb(new Error(), null);
      };
      var req = function() {};
      var res = { render: function() {}};
      var spy = sinon.spy(res, 'render');
      var err = new Error();
      spy.withArgs('error', err);
      handlers.index(req, res);
      assert.equal(spy.calledOnce, true, 'res.render called once');
      assert(spy.withArgs('error', err).calledOnce, 'res.render was called once with an error to render error view');
    });

  });

  describe('landing-pages.first_lp(req, res)', function() {
    it('should render the landing-pages/first-lp view', function() {
      var req = function() {};
      var res = { render: function() {}};
      var spy = sinon.spy(res, 'render');
      spy.withArgs('landing-pages/first-lp', {});
      handlers.first_lp(req, res);
      assert.equal(spy.calledOnce, true, 'res.render called once');
      assert(spy.withArgs('landing-pages/first-lp', {}).calledOnce, 'res.render was called once with expected data to render landing-pages/first-lp view');
    });

  });

  describe('landing-pages.another_lp(req, res)', function() {
    it('should render the landing-pages/another-lp view', function() {
      var req = function() {};
      var res = { render: function() {}};
      var spy = sinon.spy(res, 'render');
      spy.withArgs('landing-pages/another-lp', {});
      handlers.another_lp(req, res);
      assert.equal(spy.calledOnce, true, 'res.render called once');
      assert(spy.withArgs('landing-pages/another-lp', {}).calledOnce, 'res.render was called once with expected data to render landing-pages/another_lp view');
    });

  });

  describe('landing-pages.online_services(req, res)', function() {
    it('should render the landing-pages/online_services view', function() {
      var req = function() {};
      var res = { render: function() {}};
      var spy = sinon.spy(res, 'render');
      spy.withArgs('landing-pages/online_services', {});
      handlers.online_services(req, res);
      assert.equal(spy.calledOnce, true, 'res.render called once');
      assert(spy.withArgs('landing-pages/online-services', {}).calledOnce, 'res.render was called once with expected data to render landing-pages/online_services view');
    });

  });
});