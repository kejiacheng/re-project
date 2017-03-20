var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');
var StaffUser = require('../models/staffUser.js');

router.post('/', function (req, res ,next){
	var data = {
		phone: req.body.phone,
		password: req.body.password
	}

	if(req.body.login_way == 'general'){
		GeneralUser.login(data)
		.then((result) => {
			if(result.length > 0){
				res.send('登录成功');
			}else{
				res.send('账号密码错误');
			}
		})	
	}else if(req.body.login_way == 'staff'){
		StaffUser.login(data)
		.then((result) => {
			console.log(result)
			if(result.length > 0){
				res.send('登录成功');
			}else{
				res.send('账号密码错误');
			}
		})	
	}
	
})

module.exports = router;