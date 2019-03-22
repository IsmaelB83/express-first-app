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
  devolverClient(res, id);
});

router.get('/body', function (req, res, next) {
  let id = req.body.customer;
  devolverClient(res, id);
});

function devolverClient(res, id) {
  let pathToFile = path.join('./', `${id}.xml`);
  fs.readFile(pathToFile, 'utf8', function (err, data) {
    if (err) res.status(404).send(`Client ${id} not found`);
    else {
      const xmlToJson = require('xml-to-json-stream');
      const parser = xmlToJson({attributeMode:false});
      parser.xmlToJson(data, (err,json)=>{
          if(err) res.status(404).send (err);
          else res.render('client', json );
      });
    }
  });
}

module.exports = router;
