var debug = require('debug')('landing-page-server:Models');
var DirectoryLoader = require('./DirectoryLoader');

module.exports = {
  Route: new Route()
};

function Route() {
  this.routes_directory = 'routes';
}

Route.prototype.find = function(routes_group_name, cb) {
  var self = this;
  var loader = new DirectoryLoader();
  loader.setDirectory(self.routes_directory);
  loader.loadFile(routes_group_name, function(err, routes_definition) {
    if (err) { return cb(err); }
    cb(null, routes_definition);
  });
};