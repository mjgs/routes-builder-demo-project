var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var DirectoryLoader = rewire('../../lib/DirectoryLoader');
var path = require('path');

describe('lib/DirectoryLoader', function() {
  var revert1, revert2, readdirMock = {}, requireMock;
  var directory = 'hipster-robots';
  var filename = 'hipster-robots-routes';
  beforeEach(function() {
    readdirMock.read = function(dir, glob, options, cb) {
      return cb(null, [ filename ]);
    };
    revert1 = DirectoryLoader.__set__('readdir', readdirMock);
    requireMock = function(name) {
      if (name === path.join(process.cwd(), directory, filename)) {
        return {
          routes: [
            [ 'get' , '/',   [ 'middleware.middleware3', 'middleware.middleware4' ],  'homepage.mainPage' ]
          ]
        }
      }
      else {
        return require(name);
      }
    };
    revert2 = DirectoryLoader.__set__('require', requireMock);
  });
  afterEach(function() {
    revert1();
    revert2();
  });
  describe('#DirectoryLoader()', function() {
    it('should return a loader object with file loading functions', function() {
      var loader = new DirectoryLoader();
      assert.equal(typeof loader, 'object', 'loader is an object');
      assert.equal(typeof loader.loadFile, 'function', 'loader.loadFile is a function');
      assert.equal(typeof loader.setDirectory, 'function', 'loader.setDirectory is a function');
    });
  });
  describe('#loadFile()', function() {
    it('should load a routes definition file', function() {
      var loader = new DirectoryLoader();
      loader.setDirectory(directory);
      loader.loadFile(filename, function(err, route_definition) {
        assert.equal(err, null, 'no error is returned');
        assert.equal(route_definition.routes.length, 1, 'routes definition has 1 route');
        assert.equal(route_definition.routes[0][1], '/', 'routes definition is for / route');
      });
    });
    it('should call the callback with an error when readdir returns an error', function() {
      readdirMock.read = function(dir, glob, options, cb) {
        return cb(new Error(), null);
      };
      var callback = sinon.spy();
      var loader = new DirectoryLoader();
      try {
        loader.loadFile('', callback);
      } catch (err) {
        assert.equal(err, new Error(), 'error was thrown');
        assert.equal(callback.calledOnce, true, 'callback was called once');
        assert.equal(callback.calledWith(new Error()), true, 'callback was called with an error as argument');
      }
    });
    it('should call the callback with an error when the require fails', function() {
      readdirMock.read = function(dir, glob, options, cb) {
        return cb(null, [ filename ]);
      };
      var callback = sinon.spy();
      var loader = new DirectoryLoader();
      loader.setDirectory('bogusdirectory');
      try {
        loader.loadFile(filename, callback);
      } catch (err) {
        assert.equal(err, new Error(), 'error was thrown');
        assert.equal(callback.calledOnce, true, 'callback was called once');
        assert.equal(callback.calledWith(new Error()), true, 'callback was called with an error as argument');
      }
    });
    it('should call the callback with an error when directory is set to a non-string', function() {
      var callback = sinon.spy();
      var loader = new DirectoryLoader();
      loader.setDirectory({});
      try {
        loader.loadFile(filename, callback);
      } catch (err) {
        assert.equal(err, new Error(), 'error was thrown');
        assert.equal(callback.calledOnce, true, 'callback was called once');
        assert.equal(callback.calledWith(new Error()), true, 'callback was called with an error as argument');
      }
    });
  });
  describe('#setDirectory()', function() {
    it('should set the DirectoryLoader directory property', function() {
      var loader = new DirectoryLoader();
      var directory = 'hipster-robots';
      loader.setDirectory(directory);
      assert.equal(loader.directory, 'hipster-robots', 'loader directory was correctly set');
    });
  });
});