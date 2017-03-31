var express = require('express');
var router = express.Router();
var allGoodsList = require('../models/allGoodsList.js');
var request = require('request');

router.get('/', function (req, res ,next){
	
})

router.post('/', function (req, res, next){
	//转换起始时间和结束时间格式并加上小时
	var start = parseInt(req.body.startTime.replace(/-/g,'')) * 100;
	var end = parseInt(req.body.endTime.replace(/-/g,'')) * 100 + 24;

	allGoodsList.getGoodsList(end, start)
	.then((result) => {
		res.send(result);
	})
})

module.exports = router;