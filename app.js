#!/usr/bin/env node
var routes_builder = require('routes-builder');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var ejs_locals = require('ejs-locals');

var app = routes_builder(express());

app.use(logger('dev'));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs_locals);

// Setup error handlers
app.on('setup-complete', function() {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler - will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler - no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
});

var server = app.listen(app.get('port'), function() {
  console.log('Starting routes-builder-demo-project - Listening on port ' + server.address().port);
});