var express = require('express');
var router = express.Router();

var libs = process.cwd() + '/routes/';
var log = require(libs + 'log')(module);


var LucyDraw = require("./routes/schema/lucydraw.js");

console.log(222);
LucyDraw.find({_id:'59ca08cc904d07181c250891', 'drawList._id' : '59ca08cc904d07181c250893'},function (err, result) {
    console.log(result);
});
