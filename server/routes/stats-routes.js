var express = require('express');
var statsRoute = express.Router();
var statsController = require('../controller/stats-controller');

var router = function(){

	statsRoute.route('/signup')
		.post(function(req,res) {
			return statsController.signup(req, res);
		});

    return statsRoute;
}

module.exports = router;
