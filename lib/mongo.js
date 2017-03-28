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

var RelGoodsSchema = new Schema({
	'绿茶': {
		type: Number
	},
	'红茶': {
		type: Number
	},
	'苹果汁': {
		type: Number
	},
	'柠檬汁': {
		type: Number
	},
	'蜜桃汁': {
		type: Number
	},
	'芒果汁': {
		type: Number
	},
	'鲜橙汁': {
		type: Number
	},
	'蜂蜜': {
		type: Number
	},
	'椰果': {
		type: Number
	},
	'果葡糖浆': {
		type: Number
	}
})

var RelGoods = mongoose.model('relGoods', RelGoodsSchema);

exports.RelGoods = RelGoods;