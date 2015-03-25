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

app.get('/result', function (req, res) {
    Participant.findOne({winner:true}, function(err, winner) {
        if (!winner) res.send({success:false, message:'winner will be chosen soon'});
        else res.send({success:true, message:'The Winner is: ' + winner.name + ' '+ winner.lastName});
    });
});

app.get('/chooseWinner', function (req, res) {
    Participant.findOne({winner:true}, function(err, winner) {
        if (!winner){
            chooseWinner(function(result){
                res.send(result);
            });
        }
        else res.send('winner already chosen');
    });
});

app.get('/add', function (req, res) {
    if (req.body.password === password){
        addParticipant(req.body.name, req.body.lastName, function(err){
            if (err) res.send(err);
            else res.send({success:true, message: req.body.name + ' ' + req.body.lastName + ' was added.'})
        });
    }
    else res.send({success:fales, message: 'wrong password'});
});

var port = process.env.port | 3000;
var server = app.listen(port, function () {
    console.log('server started on port:' + port.toString());
});