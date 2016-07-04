var Config = require('../config/config.js');
var jwt = require('jwt-simple');
var url = require('url');
var passportManager = require('../passport/auth.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trip = require('./tripSchema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var seenIds;

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

function createTrip(req, res, user_id) {

    console.log("Create a trip");
    var tmpTrip = new Trip();
    tmpTrip.title = req.body.title;
    tmpTrip.budget = req.body.budget;
    tmpTrip.dateTo = req.body.dateTo;
    tmpTrip.dateFrom = req.body.dateFrom;
    tmpTrip.route = req.body.route;
    tmpTrip.cities = req.body.cities;
    tmpTrip.countries = req.body.countries;
    tmpTrip.tags = req.body.tags;
    tmpTrip.owner = user_id;

    if (typeof  tmpTrip.cities == 'string')
        tmpTrip.cities = [tmpTrip.cities];

    if (typeof  tmpTrip.countries == 'string')
        tmpTrip.countries = [tmpTrip.countries];

    if (typeof  tmpTrip.tags == 'string') {
        tmpTrip.tags = [tmpTrip.tags];
    }
    tmpTrip.description = req.body.description;
    tmpTrip.pictures = req.body.pictures;

    /*
    tmpTrip.pictures.map(pic =>{
        pic.src = new Buffer(pic.src, "base64");
    });
    */

    tmpTrip.save(function (err, success) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send("successfully added trip: " + success.title);
    });
}

module.exports.create = function (req, res) {
    if (!req.body.token) {
        res.status(401).send('Unauthorized! token is required');
        return;
    }
    var token = req.body.token;
    // user should send his token for each request
    passportManager.verifyToken(token, req, res, createTrip);
};

module.exports.delete = function (req, res) {
    console.log("CALLED DELETE");
    if (!req.headers.token) {
        res.status(401).send('Unauthorized! token is required');
        return;
    }
    var token = req.headers.token;
    // user should send his token for each request
    passportManager.verifyToken(token, req, res, deleteTrip);
};

module.exports.updateTrip = function (req, res) {
    console.log("CALLED UPDATE");
    if (!req.headers.token) {
        res.status(401).send('Unauthorized! token is required');
        return;
    }
    var token = req.headers.token;
    // user should send his token for each request
    passportManager.verifyToken(token, req, res, updateMyTrip);
};

module.exports.getTrips = function (req, res) {
    seenIds = [];
    var mongoQuery = getMongoQuery(req.query);
    Trip.find(mongoQuery).sort('-date').limit(10).exec(function (err, trip) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error!");
            return;
        }
        trip.forEach(function (item) {
            seenIds.push(item.id);
        });
        res.status(201).json(trip);
    });
};

function getTrips(req, res, user_id) {
    seenIds = [];
    var mongoQuery = getMongoQuery(req.query);
    mongoQuery.owner = {$in: user_id};
    Trip.find(mongoQuery).sort('-date').exec(function (err, trip) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error!");
            return;
        }
        trip.forEach(function (item) {
            //
            if(seenIds)
                seenIds.push(item.id);
        });
        res.status(201).json(trip);
    });
}

module.exports.getMoreTrips = function (req, res) {
    var mongoQuery = getMongoQuery(req.query);

    mongoQuery._id = {$nin: seenIds};

    Trip.find(mongoQuery).sort('-date').limit(10).exec(function (err, trip) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error!");
            return;
        }
        trip.forEach(function (item) {
            //
            if(seenIds)
                seenIds.push(item.id);
        });
        res.status(201).json(trip);
    });
};


module.exports.getTripsFromUser = function (req, res) {
    if (!req.headers.token) {
        res.status(401).send('Unauthorized! token is required');
        return;
    }
    var token = req.headers.token;
    // user should send his token for each request
    passportManager.verifyToken(token, req, res, getTrips);
};

function getMongoQuery(query) {
    var mongoQuery = {};

    if (query.searchTerm) {
        if (typeof query.searchTerm == 'string') {
            query.searchTerm = stringToArray(query.searchTerm);
        }
    }
    if (query.countries) {
        if (typeof query.countries == 'string') {
            query.countries = stringToArray(query.countries);
        }
        mongoQuery.countries = {$in: query.countries};
    }
    if (query.cities) {
        if (typeof query.cities == 'string')
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
    return mongoQuery;
}

function stringToArray(string) {
    return string.split(", ");
}

module.exports.rateTrip = function (req, res) {
    var ObjectId = mongoose.Types.ObjectId;
    Trip.findOne({_id: new ObjectId(req.body._id)}, function (err, doc) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error!");
            return;
        }

        // check if rating already exists
        doc.rating.value || (doc.rating.value = 1);
        doc.rating.numRates || (doc.rating.numRates = 0);

        doc.rating.numRates++;

        // calculate new average
        var avg = doc.rating.value;
        var numValues = doc.rating.numRates;
        avg = (avg + ((req.body.rating - avg) / numValues));

        doc.rating.value = Math.round(avg);

        doc.save();
        res.status(201).json(doc);
    });
};

function updateMyTrip(req, res, user_id) {
    var ObjectId = mongoose.Types.ObjectId;
    Trip.findOne({_id: new ObjectId(req.body._id)}, function (err, doc) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error!");
            return;
        }
        console.log(req.body);
        doc.description = req.body.description;
        doc.title = req.body.title;
        doc.dateFrom = req.body.dateFrom;
        doc.dateTo = req.body.dateTo;
        doc.tags = req.body.tags;
        doc.budget = req.body.budget;
        doc.countries = req.body.countries;
        
        doc.save();
        res.status(201).json("Trip was successfully updated.");
    });
}

function deleteTrip(req, res, user_id) {
    var ObjectId = mongoose.Types.ObjectId;
    Trip.find({_id: new ObjectId(req.query.id)}).remove().exec(function (err, success) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error!");
            return;
        }
        res.status(201).json("Trip was deleted");
    });
};

module.exports.comment = function (req, res) {
    console.log('sdklj');
    // user should send his token for each request
    /*if(!req.body.token){
     res.status(400).send('token required');
     return;
     }

     // get the token
     var token = req.body.token;
     var decoded =  jwt.decode(token, Config.auth.jwtSecret);
     var user_id = decoded.user._id;
     */
    var comment = new Comment();

    comment.text = req.body.text;
    comment.user = user_id;
    comment.user = req.body.userID;

    Poll.findByIdAndUpdate(
        req.body.poll_id,
        {$push: {"comments": comment}},
        {safe: true, upsert: true},
        function (err, model) {


            res.status(200).send('ok');
            return;
        }
    );
};
