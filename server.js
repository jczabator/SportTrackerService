"use strict"

// TODO: Refactor to IFFE
let http = require("http");
let config = require("./config");
let mongoose = require("mongoose");
let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");

let Workout = require("./model/workout");
let User = require("./model/user");
let Exercise = require("./model/exercise");
let WorkoutService = require("./service/workoutService");

let application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(morgan("combined"));

let port = process.env.port || 8082;
let router = express.Router();

mongoose.connect(config.connectionString);

// Middleware function between requests
router.use(function (request, response, next) {
  next();
});

router.route("/workouts")
  .post(WorkoutService.createWorkout)
  .get(WorkoutService.getAllWorkouts);

router.route("/workouts/:workout_id")
  .get(WorkoutService.getWorkout)
  .put(WorkoutService.updateWorkout)
  .delete(WorkoutService.deleteWorkout)

application.use("/api", router);
application.listen(port);

console.log('SportTrackerService started at port: ' + port);