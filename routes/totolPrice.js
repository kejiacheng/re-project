var express = require('express');
var router = express.Router();
var request = require('request');

var totolPrice = 0;

router.get('/', function (req,res,next){
    res.send({totolPrice: totolPrice})
})

router.get('/clear', function(req,res,next){
    totolPrice = 0;
    res.send({success: true});
})

router.post('/', function(req, res, next){
    totolPrice = req.body.totolPrice;
    res.send({success: true});
})

module.exports = router;