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

router.post('/placebid', (req, res, next) => {
  var player = req.body;
  delete player._id;
  /*let player = new Player({
    "_id": req.body._id,
    "firstName" : req.body.firstName,
    "lastName" : req.body.lastName,
    "overall" : req.body.overall,
    "position" : req.body.position,
    "salary" : req.body.salary,
    "duration" : req.body.duration,
    "notes" : req.body.notes,
    "yearsInTeam" : req.body.yearsInTeam,
    "team" : req.body.team,
    "lastTeam" : req.body.lastTeam,
    "birthYear" : req.body.birthYear,
    "age" : req.body.age,
    "salaryBid": req.body.salaryBid,
    "durationBid": req.body.durationBid,
    "teamBid": req.body.teamBid,
    "timeBid": req.body.timeBid,
    "newSalaryBid": 0,
    "newDurationBid": 0,
    "newTeamBid": "",
    "newTimeBid": 0,
    "birds": req.body.birds
  });*/
  //console.log(player);
  Player.findOneAndUpdate({firstName: player.firstName, lastName: player.lastName}, player, function(err, doc){
    if (err) return res.send(500, { error: err });
    console.log(doc.firstName+" updated");
    return res.send("succesfully saved");
  });
});

module.exports = router;
