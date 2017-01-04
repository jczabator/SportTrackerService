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
let LogService = require("./service/logService");

let application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(morgan("combined"));

let port = process.env.port || 8081;
let router = express.Router();

mongoose.connect(config.connectionString);

router.use(function (request, response, next) {
  //LogService.logApiCall(request.body, next.name);
  next();
});

router.get('/', function (request, response) {
  response.json({ message: "hooray! welcome to our api" });
});

router.route("/workouts")
  .post(function (request, response) {
    let workout = mapRequest(request);
    console.log(workout);

    workout.save(function (error) {
      if (error) {
        response.send(error);
      }

      response.json({ message: "Workout created!" });
    });
  })
  .get(function (request, response) {
    Workout.find(function (error, workouts) {
      if (error) {
        response.send(error);
      }

      response.json(workouts);
    })
  });

router.route("/workouts/:workout_id")
  .get(function (request, response) {
    Workout.findById(request.params.workout_id, function (error, workout) {
      if (error) {
        response.send(error);
      }

      response.json(workout);
    })
  })
  .put(function (request, response) {
    Workout.findById(request.params.workout_id, function (error, workout) {
      if (error) {
        response.send(error);
      }

      workout = mapRequest(request, workout);

      workout.save(function (error) {
        if (error) {
          response.send(error);
        }

        response.json({ message: "Workout updated!" });
      })
    })
  })
  .delete(function (request, response) {
    Workout.remove({
      _id: request.params.workout_id
    }, function (error, workout) {
      if (error) {
        response.send(error);
      }

      response.json({ message: "Successfully deleted" });
    })
  })

function mapRequest(request) {
  let workout = new Workout();
  return mapRequest(request, workout);
}

function mapRequest(request, workout) {
  workout.exerciseId = request.body.exerciseId;
  workout.userId = request.body.userId;
  workout.date = request.body.date;
  workout.series = request.body.series;

  return workout;
}

application.use("/api", router);
application.listen(port);

console.log('SportTrackerService started at port: ' + port);