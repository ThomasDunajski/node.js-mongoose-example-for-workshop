var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var app = express();
var password = 'password';

mongoose.connect('mongodb://dbuser:dbpassword@ds051720.mongolab.com:51720/workshop_participants');

var ParticipantSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    winner: {type: Boolean, required:true}
});

var Participant = mongoose.model('Participant', ParticipantSchema);

app.get('/', function (req, res) {
    res.send('Rest-API is running. The avaiable functions are: /add, /result');
});

var port = process.env.port | 3000;
var server = app.listen(port, function () {
    console.log('server started on port:' + port.toString());
});