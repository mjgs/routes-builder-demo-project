var assert = require('assert');
var sinon = require('sinon');
var middleware = require('../../middleware/middleware');

describe('middleware/middleware', function() {
  describe('middleware.middleware1(req, res)', function() {
    it('should call the next callback', function() {
      var req = function() {};
      var res = { render: function() {}};
      var next = sinon.spy();

      middleware.middleware1(req, res, next);
      assert.equal(next.calledOnce, true, 'next callback called once');
    });

  });

  describe('middleware.middleware2(req, res)', function() {
    it('should call the next callback', function() {
      var req = function() {};
      var res = { render: function() {}};
      var next = sinon.spy();

      middleware.middleware2(req, res, next);
      assert.equal(next.calledOnce, true, 'next callback called once');
    });

  });

  describe('middleware.middleware3(req, res)', function() {
    it('should call the next callback', function() {
      var req = function() {};
      var res = { render: function() {}};
      var next = sinon.spy();

      middleware.middleware3(req, res, next);
      assert.equal(next.calledOnce, true, 'next callback called once');
    });

  });

  describe('middleware.middleware4(req, res)', function() {
    it('should call the next callback', function() {
      var req = function() {};
      var res = { render: function() {}};
      var next = sinon.spy();

      middleware.middleware4(req, res, next);
      assert.equal(next.calledOnce, true, 'next callback called once');
    });

  });
});