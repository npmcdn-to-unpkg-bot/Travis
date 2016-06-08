var Config = require('../config/config.js');
var jwt = require('jwt-simple');

var Poll = require('./pollSchema');


//var Strategy = require('passport-facebook').Strategy;

module.exports.create = function(req, res){
	
	// user should send his token for each request
	if(!req.body.token){
        res.status(400).send('token required');
        return;
    }

	// get the token 
	var token = req.body.token;
    console.log(token);
	var decoded =  jwt.decode(token, Config.auth.jwtSecret);
	console.log(decoded);
	var user_id = decoded.user._id;
	
	// respond if token is valid
	if (user_id != undefined){
	
			// set the id of the user as owner
			var pollObj = {};
			pollObj.options = [];
			pollObj.owner = user_id;
			pollObj.title = req.body.title;
			var options = req.body.options;
			if (options != undefined){
				options.map(item =>{
					var temp = {}
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
				res.status(500).send(err);
				return;
			}

			res.status(201).json(p);
		});
	
	}else{
		res.status(500).send('token is not valid');
        return;
	}

    
	
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
	
	
	console.log("ko");
    Poll.find(function(err, poll) {
        if (err) {
            res.status(500).send(err);
            return;
        }
       
        res.json(poll);
    });
    
    
    
    
};



module.exports.vote = function(req, res){
};


module.exports.comment = function(req, res){
};

