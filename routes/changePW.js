var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');

router.get('/', function (req, res ,next){
	res.render('post',{

	});
})

module.exports = router;