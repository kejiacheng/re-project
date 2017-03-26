var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');
var request = require('request');

router.get('/', function (req, res ,next){
	console.log('hehe');
})

router.post('/', function (req, res, next){
	
})

module.exports = router;