var Models = require('../lib/Models');

module.exports = {
  index: function (req, res) {
    console.log('This is the landing-pages.index handler');
    Models.Route.find('landing-pages', function(err, routes_definition) {
      if (err) { return res.render('error', err); }
      var route_names = [];
      routes_definition.routes.forEach(function(route) {
        if (route[1] !== '/') route_names.push(route[1].slice(1));
      });
      res.render('landing-pages/index', { pages : route_names });
    });
  },
  first_lp: function (req, res) {
    console.log('This is the landing-pages.first_lp handler');
    res.render('landing-pages/first-lp', {});
  },
  another_lp: function (req, res) {
    console.log('This is the landing-pages.another_lp handler');
    res.render('landing-pages/another-lp', {});
  },
  online_services: function (req, res) {
    console.log('This is the landing-pages.online_services handler');
    res.render('landing-pages/online-services', {});
  }
};