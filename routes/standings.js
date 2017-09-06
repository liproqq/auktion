const express = require('express');
const router = express.Router();
const Standings = require("../models/standings");

router.get("/all", (req, res, next) => {

  Standings.find({}, (err, data) => {
    if (err) throw err;
    res.json(data);
    console.log('retrieved all game results');
  })
});

module.exports = router;
