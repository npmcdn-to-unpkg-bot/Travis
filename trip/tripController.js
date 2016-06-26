var Config = require('../config/config.js');
var jwt = require('jwt-simple');

var Trip = require('./tripSchema');

module.exports.getAll = function(req, res){

    console.log("Get all trips");

    Trip.find(function(err, trip) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json(trip);
    });
};

module.exports.create = function(req, res){

    console.log("Create a trip");

    var tmpTrip = new Trip();
    
    tmpTrip.title = req.body.title;
    tmpTrip.budget = req.body.budget;
    tmpTrip.dateTo = req.body.dateTo;
    tmpTrip.dateFrom = req.body.dateFrom;
    tmpTrip.route = req.body.route;
    tmpTrip.tags = req.body.tags;
    tmpTrip.description = req.body.description;

    console.log(tmpTrip);

    tmpTrip.save(function (err, success) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(success);
    });
};
