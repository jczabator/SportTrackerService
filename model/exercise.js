"use strict"

var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let exerciseSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

let Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;