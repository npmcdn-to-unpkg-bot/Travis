var Config = require('./config/config.js');

/**
 * db connect
 */

var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''),{
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass
});

/**
 * create application
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

/**
 * app setup
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', express.static(__dirname + '/frontend'));
//passport

var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');

app.use(passport.initialize());
app.use(passport.session());
jwtConfig(passport);


/**
 * routing
 */

var userRoutes = require("./user/userRoutes");
var pollRoutes = require("./poll/pollRoutes");
var movieRoutes = require("./movie/movieRoutes");

app.use('/api', movieRoutes(passport));
app.use('/user', userRoutes(passport));
app.use('/poll', pollRoutes(passport));


module.exports = app;