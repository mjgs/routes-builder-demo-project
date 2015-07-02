var debug = require('debug')('landing-page-server:DirectoryLoader');
var readdir = require('readdir');
var path = require('path');

module.exports = DirectoryLoader;

function DirectoryLoader() {
  this.directory = undefined;
}

DirectoryLoader.prototype.loadFile = function(filename, cb) {
  var self = this;
  try {
    readdir.read(self.directory, [filename + '.js'], readdir.NON_RECURSIVE, function (err, files) {
      if (err) { return cb(err); }
      if (files.length !== 1) {
        return cb(new Error('DirectoryLoaderLoadFileError'));
      }
      var routes_definition, full_path, full_path_require;

      full_path = path.join(self.directory, files[0]);
      full_path_require = path.join(process.cwd(), self.directory, files[0]);

      debug('require %s', full_path);

      try {
        routes_definition = require(full_path_require);
      }
      catch (err) {
        return cb(err);
      }

      cb(null, routes_definition);
    });
  } catch(err) {
    cb(err, null);
  }
};

DirectoryLoader.prototype.setDirectory = function(directory) {
  this.directory = directory;
};