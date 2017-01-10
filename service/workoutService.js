"use strict"

const WorkoutConverter = require("../converter/workoutConverter");

//TODO: Change to const,

const createWorkoutService = function () {
  const createWorkout = function (request, response) {
    const workout = WorkoutConverter.convert(request);

    workout.save(function (error) {
      if (error) {
        response.send(error);
      }

      response.json({ message: "Workout created!" });
    });
  };

  const getAllWorkouts = function (request, response) {
    Workout.find(function (error, workouts) {
      if (error) {
        response.send(error);
      }

      response.json(workouts);
    })
  };

  const getWorkout = function (request, response) {
    Workout.findById(request.params.workout_id, function (error, workout) {
      if (error) {
        response.send(error);
      }

      response.json(workout);
    });
  };

  const updateWorkout = function (request, response) {
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
    });

    const deleteWorkout = function (request, response) {
      Workout.remove({
        _id: request.params.workout_id
      }, function (error, workout) {
        if (error) {
          response.send(error);
        }

        response.json({ message: "Successfully deleted" });
      })
    }
  };

  return {
    createWorkout: createWorkout,
    getAllWorkouts: getAllWorkouts,
    getWorkout: getWorkout,
    updateWorkout: updateWorkout,
    deleteWorkout: deleteWorkout
  };
};

const WorkoutService = createWorkoutService();
module.exports = WorkoutService;

