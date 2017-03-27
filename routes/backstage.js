var express = require('express');
var router = express.Router();
var allGoodsList = require('../models/allGoodsList.js');
var request = require('request');

router.get('/', function (req, res ,next){
	
})

router.post('/', function (req, res, next){

	//获取格式化后的今天时间
	var nowDate = new Date();
	nowDate = formatTime(nowDate, 24);

	//获取格式化后的30天前的时间
	var oldDate = new Date();
	oldDate.setDate(oldDate.getDate() - 29);
	oldDate = formatTime(oldDate, 0);
	//获取期间的购物记录
	allGoodsList.getGoodsList(nowDate,oldDate)
	.then((result) => {
		res.send(result);
	})
	//格式化时间
	function formatTime(time, hours){
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		var date = time.getDate();

		return year * 1000000 + month * 10000 + date * 100 + hours;
	}
})

module.exports = router;