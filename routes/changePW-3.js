var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');
var request = require('request');

router.get('/', function (req, res ,next){
	res.render('changePW-3',{
		phone: req.query.phone,
	});
})

router.post('/', function (req, res, next){
	
})

module.exports = router;