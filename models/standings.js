const mongoose = require('mongoose');
const config = require('../config/database');

//player Schema
const StandingsSchema = mongoose.Schema({
  "season" : Number,
  "reporter" : String,
  "reports" : {
    "for": Number,
    "against": Number,
    "opponent": String,
    "date": Date
  }
});

const Standings = module.exports = mongoose.model('Standings', StandingsSchema);
