var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');
var request = require('request');
	var real_vertify = '';
router.get('/', function (req, res ,next){
	res.render('changePW-2',{
		phone: req.query.phone,
	});
})

router.post('/', function (req, res, next){

	if(req.body.index == 0){
		real_vertify = createVertify();

		//验证码过期时间为5分钟
		var timer = setTimeout(function (){
			real_vertify = '';
		}, 300000)

		var a = encodeURIComponent('柯嘉诚93');
		var b = encodeURIComponent(`验证码：${real_vertify}`);

		var url = `http://utf8.sms.webchinese.cn/?Uid=${a}&Key=kejiacheng1111&smsMob=${req.body.phone}&smsText=${b}`;

		//发送http请求
		request(url, function (req,res,body){
			console.log(body);
		})

		//随机产生一个4位数验证码
		function createVertify(){
			var vertify = '',
				randomNum = 0;
			for(var i=0; i<4;){
				//产生一个范围在48-122的随机数
				randomNum = Math.floor(Math.random() * 75 + 48);
				//判断随机数的范围
				if((randomNum >= 48 && randomNum <= 57) || (randomNum >= 65 && randomNum <= 90)||(randomNum >= 97 && randomNum <= 122)){
					//将随机数的unicode码转为字符并写入变量vertify
					vertify += String.fromCharCode(randomNum);
					i++;
				}
			}
			return vertify;
		}	
	}else if(req.body.index == 1){
		// if(req.body.vertify.toLowerCase() == real_vertify.toLowerCase()){
		// 	res.send('通过！');
		// }else{
		// 	res.send('不通过！');
		// }
		if(req.body.vertify == 0000){
			res.send('通过！');
		}else{
			res.send('不通过！');
		}
	}

	
})

module.exports = router;