#!/usr/bin/env node
var debug = require('debug')('landing-page-server:app');
var routes_builder = require('routes-builder');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var ejs_locals = require('ejs-locals');

var app = module.exports = routes_builder(express());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');
app.engine( 'ejs', ejs_locals );

app.on('setup-complete', function(results) {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    /*jshint unused: vars*/
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      /*jshint unused: vars*/
      err.status = err.status || 500;
      res.status(err.status);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    /*jshint unused: vars*/
    err.status = err.status || 500;
    res.status(err.status);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
});

app.server = app.listen(app.get('port'), function() {
  console.log('Starting landing-pages - Listening on port ' + app.server.address().port);
});