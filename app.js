const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;

// Connect To Database
mongoose.connect(config.database, {useMongoClient: true});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const player = require('./routes/player');

const bid = require('./routes/bid');

const standings = require('./routes/standings');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(require('./config/passport'));

app.use('/users', users);

app.use('/player', player);

app.use('/bid', bid);

app.use('/standings', standings);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Start Server
const server = app.listen(port, () => {
  console.log('Server started on port ' + port);
});

module.exports = server;
