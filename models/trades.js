const mongoose = require('mongoose');
const config = require('../config/database');

//trades Schema
const TradesSchema = mongoose.Schema({
  "offering": String,
  "receiving": String,
  "ownPlayers": Array,
  "otherPlayers": Array
});

const Trades = module.exports = mongoose.model('Trades', TradesSchema);
