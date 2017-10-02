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

router.get("/team/:id/:season", (req, res, next) => {
  Standings.find({reporter: req.params.id, season: req.params.season}, (err, data) => {
    if (err) throw err;
    res.json(data);
    console.log('retrieved game results of '+ req.params.id);
  })
});

router.post("/result", (req, res, next) => {
  Standings.update({season: 1, reporter: req.body.reporter}, {$push: {reports: req.body.result}}, {upsert: true} , (err, data) => {
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  })
})

module.exports = router;
