var Config = require('../config/config.js');
var jwt = require('jwt-simple');
var url = require('url');

var Trip = require('./tripSchema');

module.exports.getAll = function (req, res) {

    console.log("Get all trips");

    Trip.find().sort('-date').limit(10).exec(function (err, trip) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json(trip);
    });
};

module.exports.create = function (req, res) {

    console.log("Create a trip");

    var tmpTrip = new Trip();
    tmpTrip.title = req.body.title;
    tmpTrip.budget = req.body.budget;
    tmpTrip.dateTo = req.body.dateTo;
    tmpTrip.dateFrom = req.body.dateFrom;
    tmpTrip.route = req.body.route;
    tmpTrip.cities = req.body.cities;
    tmpTrip.countries = req.body.countries;

    if (typeof  tmpTrip.cities == 'string')
        tmpTrip.cities = [tmpTrip.cities];
    if (typeof  tmpTrip.countries == 'string')
        tmpTrip.countries = [tmpTrip.countries];


    tmpTrip.tags = req.body.tags;
    tmpTrip.description = req.body.description;
    tmpTrip.pictures = req.body.pictures;

    tmpTrip.save(function (err, success) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json("successfully added trip: " + success.title);
    });
};

module.exports.getTrips = function (req, res) {

    console.log(req.query);
    var mongoQuery = getMongoQuery(req.query);
    Trip.find(mongoQuery).sort('-date').limit(10).exec(function (err, trip) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error!");
            return;
        }
        res.status(201).json(trip);
    });
};

function getMongoQuery(query) {
    var mongoQuery = {};
    console.log(query);
    if (query.countries) {
        if (typeof  query.countries == 'string') {
            query.countries = stringToArray(query.countries);
            console.log(query.countries);
        }
        mongoQuery.countries = {$in: query.countries};
    }
    if (query.cities) {
        if (typeof  query.cities == 'string')
            query.cities = [query.cities];
        mongoQuery.cities = {$in: query.cities};
    }
    if (query.budget)
        mongoQuery.budget = {$lte: parseFloat(query.budget)};
    if (query.tags)
        mongoQuery.tags = {$in: query.tags};

    if (query.from) {
        var tempDate = new Date(query.from);
        if (!isNaN(tempDate.getTime()))
        // date is valid
            mongoQuery.dateFrom = {"$gte": tempDate};
    }
    if (query.to) {
        var tempDate = new Date(query.to);
        if (!isNaN(tempDate.getTime()))
        // date is valid
            mongoQuery.dateTo = {"$lte": tempDate};
    }
    console.log(mongoQuery);
    return mongoQuery;
}

function stringToArray(string) {
    return string.split(",");
}

