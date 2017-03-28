var RelGoods = require('../lib/mongo').RelGoods;

module.exports = {
	buyGoods: (data) => {
		return RelGoods
		.findById('58da39e9ef94021ccc903c49', function (err,person){
			person[data.ingredients.name] -= 300;
			
			for(var i in data.accessories){
				person[i] -= data.accessories[i] * 30;
			}
			RelGoods.update({_id:'58da39e9ef94021ccc903c49'},person,function(err){});
		})
	},
	updateGoods: (data) => {

	}
}