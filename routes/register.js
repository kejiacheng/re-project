var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');

router.post('/', function (req, res ,next){
	GeneralUser.findPhoneNum(req.body.phoneNum)
	.then((result) => {
		if(!result){
			res.send('通过！');
		}else{
			res.send('该手机号已被注册！');
		}
	})
})

module.exports = router;