const mongoose = require('mongoose');
const config = require('../config/database');

//player Schema
const BidSchema = mongoose.Schema({
  "firstName" : String,
  "lastName" : String,
  "overall" : Number,
  "position" : String,
  "salary" : Number,
  "duration" : Number,
  "team" : String,
});

const Bid = module.exports = mongoose.model('Bid', BidSchema);
