"use strict"

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  createDate: Date,
  updateDate: Date
});

let User = mongoose.model("User", userSchema);
module.exports = User;
