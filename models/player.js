const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//player Schema
const PlayerSchema = mongoose.Schema({
  "firstName" : String,
  "lastName" : String,
  "overall" : Number,
  "position" : String,
  "salary" : Number,
  "duration" : Number,
  "notes" : String,
  "yearsInTeam" : Number,
  "team" : String,
  "lastTeam" : String,
  "birthYear" : Number,
  "age" : Number
});

const Player = module.exports = mongoose.model('Player', PlayerSchema);
