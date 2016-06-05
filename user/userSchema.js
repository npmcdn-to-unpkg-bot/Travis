var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
//username : {type: String,required: true,unique: true},
var userSchema = mongoose.Schema({
    email    : {type: String,required: true,unique: true}, 
	type     : {type: String,required: true},   
    userID   : {type: String,required: false},
    password : {type: String,required: false},
    
    firstName: {type: String,required: false},   
    lastName : {type: String,required: false},   
    imageURL : {type: String,required: false},   
    gender   : {type: String,required: false},
    birthDate: {type: Date  ,required: false},
    country  : {type: String,required: false},
    city     : {type: String,required: false }
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


var User = mongoose.model('User', userSchema);

module.exports = User;