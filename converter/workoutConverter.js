"use strict"

let createWorkoutConverter = function () {

  let convert = function (request, workout) {
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

let WorkoutConverter = createWorkoutConverter();
module.exports = WorkoutConverter;

