var mongoose = require('mongoose');
require('../user/userSchema');
var Schema = mongoose.Schema;


var Poll = mongoose.Schema({
	owner    : { type : Schema.Types.ObjectId, ref: 'User' },
	title    : {type: String,required: false},   
	date     : { type: Date, default: Date.now },
	
	options   : [
	             {
	              text : String,
	              vote : [{ type : Schema.Types.ObjectId, ref: 'User' }]
				 }
				], 
	comments : [{text : String,
			    user : { type : Schema.Types.ObjectId, ref: 'User' },
				date : { type: Date, default: Date.now },
				}]
});

module.exports = mongoose.model('Poll', Poll);