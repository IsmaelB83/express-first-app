"use strict";

var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', function(err) {
    console.error(err);
});
db.on('open', function() {
    console.info('Conectado a mongodb');
});

mongoose.connect('mongodb://localhost/cursonode', { useNewUrlParser: true });

/*MONGODB SIN MONGOOSE
   --------------------
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
} */
  
  