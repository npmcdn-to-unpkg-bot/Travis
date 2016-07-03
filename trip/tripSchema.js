var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trip = mongoose.Schema({
    owner    : { type : Schema.Types.ObjectId, ref: 'user' },
    title    : {type: String, required: true},
    creationDate     : { type: Date, default: Date.now },
    dateFrom     : { type: Date, required: true},
    dateTo : { type: Date, required: true},
    budget: { type: Number, required: false},
    route: { type: String, required: true},
    cities: [{type: String, required: false}],
    countries: [{type: String, required: true}],
    tags: [{ type: String, required: true}],
    description: { type: String, required: true},
    comments : [{text : String,
        user : { type : Schema.Types.ObjectId, ref: 'user' },
        date : { type: Date, default: Date.now },
    }],
    pictures: [{name :{type:String}, src:{type:Buffer}}],
    rating : { value : Number, numRates : Number }
});

module.exports = mongoose.model('Trip', Trip);
