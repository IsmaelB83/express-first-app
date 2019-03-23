"use strict";

var express = require('express');
var router = express.Router();

// Module imports
const path = require('path');
const fs = require('fs');

// Middleware a nivel de router
router.use(function(req,res,next){
  console.log('Middleware en clients');
  next();
});

/* GET clients page. */
router.get('/', function(req, res, next) {
  res.render('client', { client: undefined } );
});

router.get('/:id([0-9]+)', function (req, res, next) {
  let id = req.params.id;
  getDisco(id)
  .then(client => {
    console.log(client);
    if(client) res.render('client', client);
    else res.status(404).render ('client', undefined);
  })
});

// Conectando a mongo
var mongoClient = require('mongodb').MongoClient;
async function getDisco(id) {
  let db;
  try {
    let client = await mongoClient.connect('mongodb://localhost:27017/cursonode', { useNewUrlParser: true });  
    db = client.db('cursonode');
    try {
      let data = await db.collection('discos').find({'client.id': id}).toArray();
      if (data.length > 0) {
        console.log('encontrado');
        console.log(data[0]);
        return data[0];
      }       
    } catch (error) {
      console.log(`Error disco no encontrado`);      
    }
  } catch (err) {
    console.log(`Error conectando a la base de datos: ${err}`);    
  }
}

module.exports = router;
