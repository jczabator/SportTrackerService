"use strict"

// TODO: Refactor to IFFE
let http = require("http");
let config = require("./config");
let mongoose = require("mongoose");
let express = require("express");
let bodyParser = require("body-parser");
let Workout = require("./model/workout");

// let User = require("./model/user");
// let Exercise = require("./model/exercise");

let application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());

let port = process.env.port || 8081;
let router = express.Router();

mongoose.connect(config.connectionString);

router.use(function (request, response, next) {
  console.log("Something is happening");
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
  .delete(function(request, response){
    Workout.remove({
      _id: request.params.workout_id
    }, function(error, workout){
      if(error){
        response.send(error);
      }

      response.json({message: "Successfully deleted"});
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

console.log('Magic happens on port ' + port);


// application.get('/listWorkouts', function (request, response) {  
//   let db = mongoose.createConnection(config.connectionString);
//   console.log("Mongo connected");
//   db.on(
//     'error',
//     console.error.bind(console, 'connection error:')
//   );

//   db.once(
//     'open', 
//     function () {
//       Workout = db.model("Workout"); 
//       Workout.find(function (err, workouts) {
//         if (err){
//           return console.error(err);
//         }
//         console.log(workouts);
//         response.send(workouts);
//     })
//   });  
// })

// var server = application.listen(8081, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Example app listening at http://%s:%s", host, port)

// })
