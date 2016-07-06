var Config = require('../config/config.js');
var jwt = require('jwt-simple');
var Poll = require('./pollSchema');
var passportManager = require('../passport/auth.js');
var Comment = require('../comment/commentSchema');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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

		var response = { msg: "Poll created Successfully! poll title: " + p.title, poll: p};
		res.status(201).json(response);
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
};




module.exports.vote = function(req, res){
	// user should send his token for each request
	if(!req.body.token){
        res.status(400).send('token required');
        return;
    }

	// get the token 
	var token = req.body.token;
	var decoded =  jwt.decode(token, Config.auth.jwtSecret);
	var user_id = decoded.user._id;
	
	Poll.findOneAndUpdate(
			{ _id : req.body.poll_id, 'options._id' : req.body.option_id },
		    {$push: {"options.$.vote": user_id}},
		    {safe: true, upsert: true},
		    function(err, model) {
		        
		       // console.log(model);
		        res.status(200).send('ok');
		        return;
		    })
};


module.exports.comment = function(req, res){
	
	console.log(req.body);
	// user should send his token for each request
	if(!req.body.token){
        res.status(400).send('token required');
        return;
    }

	// get the token 
	var token = req.body.token;
	var decoded =  jwt.decode(token, Config.auth.jwtSecret);
	var user_id = decoded.user._id;
	
	var comment = new Comment();
	
	comment.text= req.body.text;
	comment.user= user_id;
	//comment.user= req.body.userID;
	console.log(req.body);

	Poll.findByIdAndUpdate(
		new ObjectId(req.body.pollId),
		    {$push: {"comments": comment}},
		    {safe: true, upsert: true},
		    function(err, model) {
				if (err) {
					res.status(500).send("Server Error! Could not add the Comment!");
					return;
				}

				Poll.find({_id :new ObjectId(req.body.pollId)}).populate("owner").populate("comments.user")
					.exec(function(err, pollObj) {
					if (err) {
						res.status(500).send("Server Error! Could get the Comments!");
						return;
					}
					console.log("///////////////////////////////////");
						console.log(pollObj[0]);

					var comments;
						if (pollObj[0])
							comments = pollObj[0].comments;
					var response = { msg: "Comment added Successfully!", comments: comments};
					res.status(201).json(response);
					return;
				});
		    }
		);
	
};

function getAllthePolls (req,res){
	Poll.find({}).populate("owner").populate("comments.user").exec(function(err, polls) {
		if (err) {
			console.log(err);
			res.status(500).send("Request failed: Could not get the Polls!");
			return;
		}else if (polls){
			polls.map( (poll) => {
			//	console.log(poll);
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
