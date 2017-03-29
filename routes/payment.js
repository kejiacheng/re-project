var express = require('express');
var router = express.Router();
var AllGoodsList = require('../models/AllGoodsList.js');
var relGoods = require('../models/relGoods.js');

router.post('/', function (req, res ,next){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1;
	var date = nowDate.getDate();
	var hours = nowDate.getHours();

	var newDate = year * 1000000 + month * 10000 + date * 100 + hours;
	//该数据用于更新售货记录
	var data = {
		phone: req.session.phone ? req.session.phone : null,
		username: req.session.username ? req.session.username : null,
		ingredients: {
			name: req.body.ingredients_name,
			price: req.body.ingredients_price
		},
		accessories: req.body.accessories,
		date: newDate
	}
	//该数据用于更新货物存量
	var dataB = {
		ingredients: {
			name: req.body.ingredients_name
		},
		accessories: {

		}
	}	
	//将辅料数据输入到dataB数据当中
	for(var i in req.body.accessories){
		dataB.accessories[i] = req.body.accessories[i].num
	}

	relGoods.buyGoods(dataB)
	.then((result) => {
		console.log(result);
	})


	AllGoodsList.create(data)
	.then((result) => {
		res.send('支付完成');
	})
})

module.exports = router;