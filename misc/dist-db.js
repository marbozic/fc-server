'use strict';

var Mongoose = require('mongoose');
var config = require('./config');

//Mongoose.connect(config.database.url);

/*Mongoose.connect("mongodb://127.0.0.1/asddsa");
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded!");
});

exports.Mongoose = Mongoose;
exports.db = db;
*/


var db = Mongoose.connect('mongodb://localhost:27017/Fire', {useMongoClient: true});

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	console.log("Connection with database succeeded!");
});

exports.Mongoose = Mongoose;
exports.db = db;