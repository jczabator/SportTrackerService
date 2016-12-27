"use strict"

// TODO: Refactor to IFFE????
let http = require("http");
let config = require("./config")
let mongoose = require("mongoose");
let User = require("./model/user");
let Workout = require("./model/workout");
let Exercise = require("./model/exercise");
var express = require('express');

var application = express();

application.get('/listWorkouts', function (req, res) {
  mongoose.connect(config.connectionString);
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    Workout.find(function (err, workouts) {
      if (err) return console.error(err);
      console.log(workouts);
      res.send(workouts);
    })    
  });
})

var server = application.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
