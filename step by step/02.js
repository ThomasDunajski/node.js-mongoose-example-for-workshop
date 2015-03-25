var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var app = express();
var password = 'password';

app.get('/', function (req, res) {
    res.send('Rest-API is running. The avaiable functions are: /add, /result');
});

var port = process.env.port | 3000;
var server = app.listen(port, function () {
    console.log('server started on port:' + port.toString());
});