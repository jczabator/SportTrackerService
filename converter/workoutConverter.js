"use strict"

const Workout = require("./../model/workout");

const createWorkoutConverter = function () {

  const convert = function (request, workout) {
    if (workout == undefined) {
      workout = new Workout();
    }
    workout.exerciseId = request.body.exerciseId;
    workout.userId = request.body.userId;
    workout.date = request.body.date;
    workout.series = request.body.series;

    return workout;
  }

  return {
    convert: convert,
  };
};

const WorkoutConverter = createWorkoutConverter();
module.exports = WorkoutConverter;

