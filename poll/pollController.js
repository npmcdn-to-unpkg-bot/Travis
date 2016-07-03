var Config = require('../config/config.js');
var jwt = require('jwt-simple');
var Poll = require('./pollSchema');
var passportManager = require('../passport/auth.js');

//var Strategy = require('passport-facebook').Strategy;


function saveThePoll(req, res,user_id){
	var pollObj = {};
	pollObj.options = [];
	pollObj.owner = user_id;
	pollObj.title = req.body.title;
	var options = req.body.options;
	if (options != undefined){
		options.map(item =>{
			var temp = {};
		temp.text = item;
		temp.vote = [];
		pollObj.options.push(temp);
	});
	}
	pollObj.comments = [];

	var poll = new Poll(pollObj);

	//do not allow user to fake identity. The user who postet the movie must be the same user that is logged in
	/*if (!req.user.equals(movie.user)) {
	 res.sendStatus(401);
	 }*/

	poll.save(function(err, p) {
		if (err) {
			res.status(500).send("Server Error! Could not store the Poll!");
			return;
		}

		res.status(201).send("Poll created Successfully! poll title: " + p.title);
	});
}

module.exports.create = function(req, res){
	if(!req.body.token){
		res.status(401).send('Unauthorized! token is required');
		return;
	}
	var token = req.body.token;
	// user should send his token for each request
	passportManager.verifyToken(token,req,res,saveThePoll);
};

module.exports.remove = function(req, res){
    // Use the Beer model to find a specific beer and remove it
    Poll.findById(req.body.poll_id, function(err, p) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        
        if(p){
        //authorize
       // if (p.user && req.user.equals(p.user)) {
            p.remove();
            res.sendStatus(200);
       // } else {
       //     res.sendStatus(401);
       // }
        }else
        {
        	res.sendStatus(200);
        }

    });
};
module.exports.getPoll = function(req, res){
	if(!req.get('token')){
		res.status(401).send('Unauthorized! token is required');
		return;
	}
	var token = req.get('token');
	passportManager.verifyToken(token,req,res,getAllthePolls);
	/*
	 Poll.aggregate(
	 [ {$unwind: "$comments"},
	 { $limit : 3 },
	 {$project: {"_id": 1, "owner": 1, "options":1,"comments": 1}}]
	 ,function (err, result) {
	 if (err) {
	 console.log(err);
	 res.status(500).send("internal server error");
	 return;
	 }
	 console.log(result);
	 res.status(200).json({'polls': result});
	 });
	 */
};




module.exports.vote = function(req, res){
};


module.exports.comment = function(req, res){
};

function getAllthePolls (req,res){
	Poll.find({}).populate("owner").populate("comments.user").exec(function(err, polls) {
		if (err) {
			console.log(err);
			res.status(500).send("Request failed: Could not get the Polls!");
			return;
		}else if (polls){
			polls.map( (poll) => {
				console.log(poll);
			var temp = {};
			temp.firstName = poll.owner.firstName;
			temp.imageURL = poll.owner.imageURL;
			temp._id = poll.owner._id;
			poll.owner = temp;

			// filter the info of the users of the comments
			if (poll.comments){
				poll.comments.map((comment) => {
					var temp = {};
				temp.firstName = comment.user.firstName;
				temp.imageURL = comment.user.imageURL;
				temp._id = comment.user._id;
				comment.user = temp;
			});
			}

		});
			return res.status(200).json(polls);
		}
	});
}
