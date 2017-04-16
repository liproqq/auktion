const express = require('express');
const router = express.Router();
const Player = require("../models/player");

router.get("/all", (req, res, next) => {
  Player.find({}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved list of players', player.length);
  })
});

router.get("/freeagents", (req, res, next) => {
  Player.find({duration:  0}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved list of '+player.length+' free agents');
  })
});

router.get("/position/:id", (req, res, next) => {
  Player.find({position: req.params.id}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved list of '+player.length+' '+req.params.id+"s");
  })
});


router.get("/lastname/:id", (req, res, next) => {
  console.log(req.params.id);
  Player.find({lastName: req.params.id}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved ' + player);
  })
})

router.get("/team/:id", (req, res, next) => {
  Player.find({team: req.params.id}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved ' + player);
  })
})

module.exports = router;
