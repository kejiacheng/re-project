var AllGoodsList = require('../lib/mongo').AllGoodsList;

module.exports = {
	create: (data) => {
		var newGoods = new AllGoodsList({
			phone: data.phone,
			username: data.username,
			ingredients: data.ingredients,
			accessories: data.accessories,
			date: data.date
		});

		return newGoods.save();
	},
	getGoodsList: function getGoodsList(now, old){
		return AllGoodsList
		.find({})
		.where('date').gt(old).lt(now)
		.exec();
	}
}