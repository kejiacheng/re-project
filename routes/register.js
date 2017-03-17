var express = require('express');
var router = express.Router();
var GeneralUser = require('../models/generalUser.js');

router.post('/', function (req, res ,next){
	GeneralUser.findPhoneNum(3123123)
	.then((result) => {
		res.send('你好啊');
	})
})

module.exports = router;