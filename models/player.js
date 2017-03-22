const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//player schema
const playerSchema = mongoose.Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  overall: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  yearsInTeam: {
    type: Number,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  lastTeam: {
    type: Number,
  },
  birthYear: {
    type: Number,
  },
  age: {
    type: Number,
  }
});

const player = module.exports = mongoose.model("player", playerSchema);
