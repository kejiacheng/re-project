var express = require('express');
var router = express.Router();
var relGoods = require('../models/relGoods.js');
var request = require('request');

router.get('/', function (req, res ,next){
	
})

router.post('/', function (req, res, next){
	relGoods.updateGoods(req.body)
	.then((result) => {
		res.send(result);
	})
})

module.exports = router;