"use strict"

// TODO: Refactor to IFFE????

let config = require("./../config")
let mongoose = require("mongoose");
let firstWorkoutData = require("./data/workoutCollection");
let firstExerciseData = require("./data/exerciseCollection");
let firstUserData = require("./data/userCollection");
let User = require("./../model/user");
let Workout = require("./../model/workout");
let Exercise = require("./../model/exercise");


mongoose.connect(config.connectionString);

let firstExercise = createExercise(firstExerciseData);
let firstUser = createUser(firstUserData);
let firstWorkout = createWorkout(firstWorkoutData, firstExercise, firstUser);

firstExercise.save(handleSave, "firstExercise");
firstUser.save(handleSave, "firstUser");
firstWorkout.save(handleSave, "firstWorkout");

mongoose.disconnect();

function handleSave(error, modelName) {
  if (error) {
    console.log(error);
    throw error;
  }

  console.log(modelName + " saved successfully");
}

function createExercise(firstExerciseData) {
  let firstExercise = new Exercise({
    id: firstExerciseData.id,
    name: firstExerciseData.name
  });

  return firstExercise;
}

function createUser(firstUserData) {
  let firstUser = new User({
    "name": firstUserData.name,
    "userName": firstUserData.userName,
    "password": firstUserData.password,
    "admin": firstUserData.admin,
    "createDate": new Date(),
  });

  return firstUser;
}

function createWorkout(firstWorkoutData, firstExercise, firstUser) {
  let firstWorkout = new Workout({
    exerciseId: firstExercise._id,
    userId: firstUser._id,
    date: firstWorkoutData.date,
    series: firstWorkoutData.series
  });

  return firstWorkout;
}