var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/graduation_project');

var Schema = mongoose.Schema;

var GeneralUserSchema = new Schema({
	phone: {
		type: Number,
		unique: true
	},
	username: {
		type: String,
		unique: true
	},
	password: String
});

var GeneralUser = mongoose.model('generalUser', GeneralUserSchema);

exports.GeneralUser = GeneralUser;

var StaffUserSchema = new Schema({
	phone: {
		type: Number,
		unique: true
	},
	username: {
		type: String,
		unique: true
	},
	password: String
});

var StaffUser = mongoose.model('staffUser', StaffUserSchema);

exports.StaffUser = StaffUser;

var AllGoodsListSchema = new Schema({
	phone: {
		type: Number
	},
	username: {
		type: String
	},
	date: {
		type: Number
	},
	ingredients: {
		type: Object
	},
	accessories: {
		type: Object
	}
});

var AllGoodsList = mongoose.model('allGoodsList', AllGoodsListSchema);

exports.AllGoodsList = AllGoodsList;