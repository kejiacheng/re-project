var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');

router.post('/', function (req, res ,next){
	var real_vertify = '';
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
	}
	
})

module.exports = router;