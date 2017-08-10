const mongoose = require('mongoose');
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
  "age" : Number,
  "salaryBid": Number,
  "durationBid": Number,
  "teamBid":String,
  "timeBid": Number,
  "newSalaryBid": Number,
  "newDurationBid": Number,
  "newTeamBid": String,
  "newTimeBid": Number,
  "birds": Boolean
});

const Player = module.exports = mongoose.model('Player', PlayerSchema);
