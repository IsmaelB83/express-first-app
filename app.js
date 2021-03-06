"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('./lib/mongoose');
require('./models/Athletes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Log middleware 
app.use(function(req,res,next) {
  console.log('Middleware a nivel de app');
  next();
});

// Routers
app.use('/', require('./routes/index'));
app.use('/api/athletes', require('./routes/api/athletes'));
app.use('/athletes', require('./routes/athletes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (isAPI(req)) {
    res.json({status: 'error', error: err.message});
  } else {
    res.render('error');
  }
});

// No renderizar las llamadas de la API
function isAPI (req) {
  return req.originalUrl.indexOf("/api") === 0;
}

module.exports = app;
