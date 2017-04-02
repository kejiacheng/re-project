var express = require('express');
var router = express.Router();
var request = require('request');
var allGoodsList = require('../models/allGoodsList.js');
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
		var lackGoods = [];
		//判断该主料是否已通知
		if(!req.session[dataB.ingredients.name]){
			//判断主料是否存库充足
			if(result[dataB.ingredients.name] < req.session.goods[dataB.ingredients.name]){
				lackGoods.push(dataB.ingredients.name);
				req.session[dataB.ingredients.name] = 'done';
			}	
		}
		//循环辅料
		for(var i in dataB.accessories){
			//判断该辅料是否已通知
			if(!req.session[i]){
				//判断该辅料是否存库充足
				if(result[i] < req.session.goods[i]){
					lackGoods.push(i);
					req.session[i] = 'done';
				}	
			}
			
		}
		if(lackGoods.length){
			lackGoods = lackGoods.join(',');
			var a = encodeURIComponent('柯嘉诚93');
			var b = encodeURIComponent(`${lackGoods} 货物存量不足！！`);

			var url = `http://utf8.sms.webchinese.cn/?Uid=${a}&Key=kejiacheng1111&smsMob=15869178373&smsText=${b}`;
			//发送http请求
			request(url, function (req,res,body){
				console.log(body);
			})
		}
		
	})


	allGoodsList.create(data)
	.then((result) => {
		res.send('支付完成');
	})
	//判断过去30天购物记录的session是否已失效
	if(!req.session.goods){
		//获取格式化后的今天时间
		var nowDate = new Date();
		nowDate = formatTime(nowDate);

		//获取格式化后的30天前的时间
		var oldDate = new Date();
		oldDate.setDate(oldDate.getDate() - 29);
		oldDate = formatTime(oldDate);
		//获取期间的购物记录
		allGoodsList.getGoodsList(nowDate,oldDate)
		.then((result) => {
			//统计上个月的各物销售记录并用session保存
			var json = {};
			var ingredientsPerVolume = 300;
			var accessoriesPerVolume = 30;
			result.forEach((arr) => {
				if(!json[arr.ingredients.name]){
					json[arr.ingredients.name] = 1 * ingredientsPerVolume;
				}else{
					json[arr.ingredients.name] += 1 * ingredientsPerVolume;
				}

				for(var i in arr.accessories){
					if(!json[i]){
						json[i] = arr.accessories[i].num * accessoriesPerVolume;
					}else{
						json[i] += arr.accessories[i].num * accessoriesPerVolume;
					}
				}
			})
			//计算平均6天所消耗的量
			for(var j in json){
				json[j] /= 5;
			}
			req.session.goods = json;
		})
		//格式化时间
		function formatTime(time){
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();

			return year * 1000000 + month * 10000 + date * 100;
		}
	}
})

module.exports = router;