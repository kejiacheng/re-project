var express = require('express');
var router = express.Router();
var AllGoodsList = require('../models/AllGoodsList.js');

router.post('/', function (req, res ,next){
	console.log(req.body);
})

module.exports = router;