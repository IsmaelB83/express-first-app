"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Athletes = mongoose.model('Athletes');

mongoose.set('debug', true);

router.get('/', function(req, res, next) {
  Athletes.find().exec(function(err,result) {
    if (err) {
      next(err);
      return;
    } 
    res.status(200).render('athlete', {status: 'ok', result: result});
  });
});

router.get('/:id', function (req, res, next) {
  console.log(req.params.id);
  Athletes.find({_id: req.params.id}).exec(function(err,result) {
    if (err) {
      next(err);
      return;
    }
    res.status(200).render('athlete-detail', {status: 'ok', result: result});
  });  
});

module.exports = router;