var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Poll = mongoose.Schema({
	owner    : { type : Schema.Types.ObjectId, ref: 'user' }, 
	title    : {type: String,required: false},   
	date     : { type: Date, default: Date.now },
	
	options   : [
	             {
	              text : String,
	              vote : [{ type : Schema.Types.ObjectId, ref: 'user' }]
				 }
				], 
	comments : [{text : String,
			    user : { type : Schema.Types.ObjectId, ref: 'user' },
				date : { type: Date, default: Date.now },
				}]
});

module.exports = mongoose.model('Poll', Poll);