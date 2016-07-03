/**
 * Created by Arash on 03-Jul-16.
 */
var User = require('../user/userSchema');
var Config = require('../config/config');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports.verifyToken = function (token,req,res,callBackFunction){
    try{
        var decoded =  jwt.decode(token, Config.auth.jwtSecret);
        console.log(decoded);
        User.find({$or: [{_id: new ObjectId(decoded.user._id) },{userID: decoded.user._id}]}, function(err, user) {
            if (user){
                console.log("found");
                console.log(decoded.user._id);
                callBackFunction(req,res,decoded.user._id);
            }else if (!user) {
                console.log("user Not found");
                res.status(401).send('Token validation failed!');

            }
            else if(err) {
                console.log(err);
                 res.status(401).send('Token validation failed!');
                //throw err;
            }
        });
    }catch(err){
        console.log(err);
        res.status(401).send('Token validation failed!');
    }

};
