"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Athletes = mongoose.model('Athletes');

mongoose.set('debug', true);

router.get('/', function(req, res, next) {
  try {
    let id = req.params.id;
    getAthletes(function(err, list){
      if (!err) res.status(200).render('athlete', {status: 'ok', result: list});
      else {
        console.log(err);
        res.status(404).render('athlete', {status: 'ko', result: null});
      }
    });
  } catch (err) {    
    console.log('excepcion');
    next(err);
  }
});

router.get('/:id([0-9]+)', function (req, res, next) {
    try {
      let id = req.params.id;
      getAthlete(id, function(err, list){
        if (!err) res.status(200).render('athlete-detail', {status: 'ok', result: list});
        else {
          console.log(err);
          res.status(404).render('athlete-detail', {status: 'ko', result: null});
        }
      });
    } catch (err) {    
      console.log('excepcion');
      next(err);
    }
});

async function getAthletes(callback) {
  try {
    console.log('get athletes');
    let athletes = await Athletes.find().exec();
    callback('', athletes);      
  } catch (err) {
    callback(err, undefined);
  }  
}

async function getAthlete(id, callback) {
  try {
    console.log('get athlete init');
    let athlete = await Athletes.find({id: id}).exec();
    console.log('get athlete finished');
    console.log(athlete);
    callback('', athlete);
  } catch (err) {
    callback(err, undefined);
  }  
}

module.exports = router;