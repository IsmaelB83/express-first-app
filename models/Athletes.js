"use strict";

var mongoose = require('mongoose');

var athleteSchema = mongoose.Schema({
    name: String,
    age: Number,
    country: String,
    gamesWon: Number,
    imageUrl: String,
    bio: String,
    instagram: String,
});

athleteSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    var query = Athlete.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
    /* query.exec(function(err,result){
        callback(err,result);
    }); */
}

var Athlete = mongoose.model('Athletes', athleteSchema);