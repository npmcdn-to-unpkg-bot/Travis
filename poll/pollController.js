
var Poll = require('./pollSchema');


//var Strategy = require('passport-facebook').Strategy;

module.exports.create = function(req, res){

    var poll = new Poll(req.body);

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

