const express = require('express');
const router = express.Router();
const Player = require("../models/player");

router.get("/all", (req, res, next) => {

  // bug fix for sort in front end
  Player.updateMany({team: null}, {$set: {team: ""}},(err) => {
    if (err) throw err;
  })


  Player.find({}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log('retrieved list of players', player.length);
  })
});

router.get("/freeagents", (req, res, next) => {
  let dayAgo= (Date.now()/1)-1000*60*60*24;

  //check if a bid was more than 24h
  Player.find({timeBid: {$lt: dayAgo}, duration: {$lt: 1} }, (err, player) => {
    if (err) throw err;
    console.log('retrieved list of '+player.length+' signed free agents');
    player.forEach((player) => {
      Player.updateOne(
      {firstName: player.firstName, lastName: player.lastName},
      {$set: {
        duration: player.durationBid,
        durationBid: null,
        salary: player.salaryBid,
        salaryBid: null,
        team: player.teamBid,
        lastTeam: player.teamBid,
        teamBid: null,
        timeBid: null
        }
      }, (err, doc) => {
        if (err) throw err;
      })
    });
  })


  // return actual free agents
  Player.find({duration:  0}, (err, player) => {
    if (err) throw err;
    player.sort((a,b) => {
      return a.timeBid-b.timeBid
    })
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

router.get("/name/:id/:id2", (req, res, next) => {
  console.log(req.params.id);
  Player.find({lastName: req.params.id, firstName: req.params.id2}, (err, player) => {
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

router.get("/bids/team/:id", (req, res, next) => {
  Player.find({teamBid: req.params.id}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log(req.params.id+ "'s bids retrieved");
  })
});

router.post('/placebid', (req, res, next) => {
  var player = req.body;
  delete player._id;
  Player.findOneAndUpdate({firstName: player.firstName, lastName: player.lastName}, player, function(err, doc){
    if (err) return res.send(500, { error: err });
    console.log(doc.firstName+" updated");
    return res.send("succesfully saved");
  });
});

module.exports = router;
