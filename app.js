"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientsRouter = require('./routes/clients');

var app = express();

// Conectando a mongo
var mongoClient = require('mongodb').MongoClient;

connect('mongodb://localhost:27017/cursonode');
function connect(url) {
  let db;
  console.log('conectando...');
  mongoClient.connect(url, { useNewUrlParser: true } )
  .then (client => {
    console.log(`Conectado a mongodb in ${client.s.url}`);
    db = client.db('cursonode');
    db.collection('discos').find().toArray(function(err, data) {
      if (data.length === 0) {
        insert(db, { client: { id: '1', title: 'Zapatillas', artist: 'El canto del loco', country: 'Spain', company: 'Sony', price: '10.99', year: '2005'}});
        insert(db, { client: { id: '2', title: 'Promesas', artist: 'Pereza', country: 'Spain', company: 'Sony Entertainment', price: '13.99', year: '2006'}});
        insert(db, { client: { id: '3', title: 'Hard work', artist: 'Dual Core', country: 'USA', company: 'MTV', price: '8.99', year: '2017'}});      
        client.close();
      }
    });    
  })
  .catch (err => {
    console.log(`Error conectando a la base de datos: ${err}`);
    return process.exit();
  })
}

function insert(db, json) {
  db.collection('discos').insertOne(json)
  .then ( res => {
    console.log(`Insertado ok ${res}`);
  })
  .catch ( err => {
    console.log(`Error ${err}`);
  })
}

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
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);

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
  res.render('error');
});

module.exports = app;
