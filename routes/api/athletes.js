"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Athletes = mongoose.model('Athletes');

mongoose.set('debug', true);

router.get('/', function(req, res, next) {
  /* Athletes.find().exec(function(err,result) { */
  let name = req.query.name;
  let country = req.query.country;
  let limit = req.query.limit || null;
  let skip = req.query.skip || null;
  let fields = req.query.fields || null;
  let sort = req.query.sort || null;
  let filter = {}
  if (name) filter.name = name;
  if (country) filter.country = country;
  Athletes.list(filter, limit, skip, fields, sort, function(err,result) {
    if (err) {
      next(err);
      return;
    }
    res.status(404).json({status: 'ok', result: result});
  });
});

router.post('/', function (req, res, next) { 
  let athlete = new Athletes(req.body);
  athlete.save(function(err,result){
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

router.get('/:id', function (req, res, next) {
  Athletes.find({_id: req.params.id}).exec(function(err,result) {
    if (err) {
      next(err);
      return;
    }
    res.status(404).json({status: 'ok', result: result});
  });  
});

router.put('/:id', function (req, res, next) {
  Athletes.update({_id: req.params.id}, req.body, function(err,result){
    if (err) {
      return next(err);
    }
    res.json({status: 'ok', result: result});
  });
});

router.delete('/:id', function (req, res, next) {
  Athletes.deleteOne({_id: req.params.id}, function(err,result){
    if (err) {
      return next(err);
    }
    res.json({status: 'ok', result: result});
  });
});


module.exports = router;