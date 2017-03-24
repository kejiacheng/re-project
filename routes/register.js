var express = require('express');
var router = express.Router();
var request = require('request');
var GeneralUser = require('../models/generalUser.js');

// mongoose.connect('mongodb://localhost:27017/graduation_project');
var real_vertify = '';
router.post('/', function (req, res ,next){
	if(req.body.index == 0){
		GeneralUser.findPhone(req.body.phone)
		.then((result) => {
			if(!result){
				res.send('通过！');
			}else{
				res.send('该手机号已被注册！');
			}
		})	
	}else if(req.body.index == 1){
		GeneralUser.findUsername(req.body.username)
		.then((result) => {
			if(!result){
				res.send('通过！');
			}else{
				res.send('该用户名已存在！');
			}
		})	
	}else if(req.body.index == 2){
		if(real_vertify){
			if(real_vertify.toLowerCase() == req.body.vertify.toLowerCase()){
				res.send('通过！');
			}else{
				res.send('验证错误');
			}
		}else{
			res.send('请获取验证码');
		}
	}else if(req.body.index == 3){
		real_vertify = createVertify();
		//验证码过期时间为5分钟
		var timer = setTimeout(function (){
			real_vertify = '';
		}, 300000)
		//
		var a = encodeURIComponent('柯嘉诚93');
		var b = encodeURIComponent(`验证码：${real_vertify}`);

		var url = `http://utf8.sms.webchinese.cn/?Uid=${a}&Key=kejiacheng1111&smsMob=${req.body.phone}&smsText=${b}`;

		//发送http请求
		request(url, function (req,res,body){
			console.log(body);
		})

		res.send(real_vertify);
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
	}else if(req.body.index == 4){
		//将数据赋值给data
		var data = {
			phone: req.body.phone,
			username: req.body.username,
			password: req.body.password
		}

		GeneralUser.create(data)
		.then((result) => {
			if(result){
				req.session.phone = result.phone;
				req.session.password = result.password;
				req.session.username = result.username;
				req.session.login_way = 'general';
				res.send('注册成功');
			}
		})
	}
})

module.exports = router;