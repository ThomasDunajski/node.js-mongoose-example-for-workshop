var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var app = express();
var password = 'password';

var port = process.env.port | 3000;
var server = app.listen(port, function () {
    console.log('server started on port:' + port.toString());
});