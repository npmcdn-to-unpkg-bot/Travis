var mongoose = require('mongoose');
require('../user/userSchema');
var Schema = mongoose.Schema;


var Comment = mongoose.Schema(
		       {text : String,
			    user : { type : Schema.Types.ObjectId, ref: 'User' },
				date : { type: Date, default: Date.now }
				}
);

module.exports = mongoose.model('Comment', Comment);