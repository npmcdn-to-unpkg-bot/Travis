var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');

//var Strategy = require('passport-facebook').Strategy;

module.exports.login = function(req, res){

    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user), imageURL:user.imageURL, firstName: user.firstName, _id:user._id});
            }
        });
    });

};

module.exports.signup = function(req, res){

	console.log(req.body);
	
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if( req.body.type == "Travis" && !req.body.password ){
        res.status(400).send('password required');
        return;
    }


    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.type = req.body.type;
    user.userID = req.body.userID;
    /*
	user.firstName = req.body.name.givenName;
    user.lastName = req.body.name.familyName;
	*/
	user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
	
	
    user.imageURL = req.body.imageURL;
    user.gender = req.body.gender;
    user.birthDate = req.body.birthDate;
    user.country = req.body.country;
    user.city = req.body.city;
  
    
if(user.type !== "Travis")
	{
    User.findOne({userID: user.userID}, function(err, foundUser){
        if (foundUser) {
			console.log("user found!");
			console.log(foundUser);
        	res.status(200).json({token: createToken(foundUser),_id:user._id});
        	return;
        }else
        {
    	    user.save(function(err) {
    	        if (err) {
    	            res.status(500).send(err);
    	            return;
    	        }
				console.log("user saved!!!");
				console.log(user);
    	        res.status(201).json({token: createToken(user) , _id:user._id});
    	        return;
    	    });	
        }
    });
	}else
	{
	    user.save(function(err) {
	        if (err) {
	            res.status(500).send(err);
	            return;
	        }

	        res.status(201).json({token: createToken(user), imageURL:user.imageURL, firstName: user.firstName, _id:user._id});
	        return;
	    });	
	}


	

};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};



module.exports.update = function(req, res){

    var userProfile = new User();

   // user.email = req.body.email;
    userProfile.password = req.body.password;
    userProfile.type = req.body.type;
    userProfile.userID = req.body.userID;
    userProfile.firstName = req.body.firstName;
    userProfile.lastName = req.body.lastName;
    userProfile.imageURL = req.body.imageURL;
    userProfile.gender = req.body.gender;
    userProfile.birthDate = req.body.birthDate;
    userProfile.country = req.body.country;
    userProfile.city = req.body.city;

    User.findOne({email: req.body.email}, function(err, user){
 
    	
    	user.type = req.body.type;
    	user.userID = req.body.userID;
    	user.firstName = req.body.firstName;
    	user.lastName = req.body.lastName;
    	user.imageURL = req.body.imageURL;
    	user.gender = req.body.gender;
    	user.birthDate = req.body.birthDate;
    	user.country = req.body.country;
    	user.city = req.body.city;
    	user.save(function(err,user){
    		res.status(200).json(user);
    		
    	});
    	
 // Render not found error
 if(!user) {
   return res.status(404).json({
     message: 'user with email ' + req.body.email + ' can not be found.'
   });
 }
 
 // Update the course model
/* User.update({email: req.body.email},userProfile,'' ,function(err, user) {

   res.status(200).json(user);

 });*/
});

};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};


module.exports.lookup = function(req, res){

    if(!req.body.token){
        res.status(400).send('token required');
        return;
    }

    var token = req.body.token;
    console.log(token);
	
	var decoded =  jwt.decode(token, Config.auth.jwtSecret);
	console.log(decoded);
	var user_id = decoded.user._id;
	if (user_id != undefined){
		
		User.findOne({_id: user_id}, function(err, user){
			if (user) {
                var temp_user = {};
                temp_user['imageURL'] = user.imageURL;
                temp_user['email'] = user.email;
                temp_user['name'] = user.firstName;
                temp_user['gender'] = user.gender;
                temp_user['birthDate'] = user.birthDate;
                temp_user['country'] = user.country;
                temp_user['city'] = user.city;
                res.status(200).json({'user': temp_user});
			}else{
                res.status(500).send("token is invalid");
            }
		});
	}else{
		res.status(500).send("token is invalid");
	}
};


function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            email: user.email
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};