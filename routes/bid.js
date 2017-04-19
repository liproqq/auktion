const express = require('express');
const router = express.Router();
const Bid = require("../models/bid");

router.post('/placebid', (req, res, next) => {
  console.log(req.body.lastName+", "+req.body.firstName+ " bid posted by "+req.body.team+" for "+req.body.salary);
  let newBid = new Bid({
    _id: undefined,
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    overall: req.body.overall,
    position: req.body.position,
    salary: req.body.salary,
    duration: req.body.duration,
    team: req.body.team
  });

  Bid.findOneAndUpdate({firstName: newBid.firstName, lastName: newBid.lastName, team: newBid.team}, newBid, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  });
});

router.get("/all", (req, res, next) => {
  Bid.find({}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log("All bids retrieved");
  })
});

router.get("/team/:id", (req, res, next) => {
  Bid.find({team: req.params.id}, (err, player) => {
    if (err) throw err;
    res.json(player);
    console.log(req.params.id+ "'s bids retrieved");
  })
});

router.delete("/delete/:id", (req, res, next) => {
  console.log("delete route activated"+ req.params.id);
  Bid.findByIdAndRemove(req.params.id, (err, player, result) => {
    if (err) throw err;
    res.json(player);
    console.log(player.lastName+ "'s bids withdrawn");
  })
}
);


module.exports = router;
