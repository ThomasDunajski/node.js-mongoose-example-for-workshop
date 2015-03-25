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

function addParticipant(newName, newLastName, callback){
    var participant = new Participant({
        name: newName,
        lastName: newLastName,
        winner:false
    });
    participant.save(function(err){
        callback(err);
    });
}

function chooseWinner(callback){
    Participant.find({}, function(err, participants) {
        var count = participants.length;
        var winner = participants[Math.floor((Math.random() * count))];
        Participant.update({name:winner.name, lastName:winner.lastName},
            {name:winner.name, lastName:winner.lastName, winner:true}, function(){
                callback(winner.name + ' ' + winner.lastName);
            });
    });
}

app.get('/', function (req, res) {
    res.send('Rest-API is running. The avaiable functions are: /add, /result');
});

var port = process.env.port | 3000;
var server = app.listen(port, function () {
    console.log('server started on port:' + port.toString());
});