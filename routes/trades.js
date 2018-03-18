const express = require('express');
const router = express.Router();
const Trades = require("../models/trades");

router.get("/all", (req, res, next) => {
  Trades.find({}, (err, data) => {
    if (err) throw err;
    res.json(data);
    console.log('retrieved all trades');
  })
});


module.exports = router;
