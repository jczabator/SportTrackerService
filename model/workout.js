"use strict"

var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let workoutSchema = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, required: true, ref: "Exercise" },  
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  date: Date,
  series: [
      {
        weight: Number,
        times: Number
      }
    ]
  });

let Workout = mongoose.model("Workout", workoutSchema);
module.exports =  Workout;