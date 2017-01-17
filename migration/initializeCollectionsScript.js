"use strict"

// TODO: Refactor to IFFE, move methods to generator.js

const config = require("./../config")
const mongoose = require("mongoose");
const firstWorkoutData = require("./data/workoutCollection");
const firstExerciseData = require("./data/exerciseCollection");
const firstUserData = require("./data/userCollection");
const User = require("./../model/user");
const Workout = require("./../model/workout");
const Exercise = require("./../model/exercise");


mongoose.connect(config.connectionString);

const firstExercise = createExercise(firstExerciseData);
const firstUser = createUser(firstUserData);
const firstWorkout = createWorkout(firstWorkoutData, firstExercise, firstUser);

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
  const firstExercise = new Exercise({
    id: firstExerciseData.id,
    name: firstExerciseData.name
  });

  return firstExercise;
}

function createUser(firstUserData) {
  const firstUser = new User({
    "name": firstUserData.name,
    "userName": firstUserData.userName,
    "password": firstUserData.password,
    "admin": firstUserData.admin,
    "createDate": new Date(),
  });

  return firstUser;
}

function createWorkout(firstWorkoutData, firstExercise, firstUser) {
  const firstWorkout = new Workout({
    exerciseId: firstExercise._id,
    userId: firstUser._id,
    date: firstWorkoutData.date,
    series: firstWorkoutData.series
  });

  return firstWorkout;
}