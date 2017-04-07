const express = require('express');
const router = express.Router();
const Player = require("../models/player");

router.get("/all", (req, res, next) => {
  Player.find({}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved list of players', player.length, player[0].firstName);
  })
});

router.get("/free/:queryName", (req, res, next) => {
  Player.find({firstName: req.params.queryName}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved list of players', player.length, player[0].firstName);
  })
});


router.get("/lastname/:lastName", (req, res, next) => {
  Player.find({lastName: req.params.lastName}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved ' + player);
  })
})

router.get("/team/:team", (req, res, next) => {
  Player.find({team: req.params.team}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved ' + player);
  })
})

module.exports = router;
