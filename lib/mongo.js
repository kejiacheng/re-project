var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/graduation_project');

var Schema = mongoose.Schema;

var GeneralUserSchema = new Schema({
	phoneNum: {
		type: Number,
		unique: true
	},
	name: {
		type: String,
		unique: true
	},
	password: String
});

var GeneralUser = mongoose.model('generaUser', GeneralUserSchema);

exports.GeneralUser = GeneralUser;