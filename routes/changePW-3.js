var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');
var request = require('request');

router.get('/', function (req, res ,next){
	if(!req.headers.referer){
		return;
	}
	res.render('changePW-3',{
		phone: req.query.phone,
	});
})

router.post('/', function (req, res, next){
	GeneralUser.changePW(req.body)
	.then((result) => {
		if(result.ok == 1){
			res.send('修改完成');
		}else{
			res.send('修改失败');
		}
	})
})

module.exports = router;