const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  console.log("/users/register route activated")
  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    team: req.body.team,
    steam: req.body.steam,
    money: 1000
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            email: user.email,
            team: user.team
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// user list
router.get('/userlist', (req, res, next) => {

    User.find({}, {team:1, username:1, steam:1, money:1}, (err, user) => {
      if (err) throw err;
      res.json(user);
      console.log("user list retrieved");
    })
});

//update money
router.post("/updateMoney", (req,res,next) => {
  var money= req.body.money;
  var team= req.body.team;

  console.log(req.body)
  User.findOneAndUpdate({team: team},{$set: {money: money}}, (err, user) => {
    if (err) throw err;
    res.json({success:true});
  })
})

module.exports = router;
