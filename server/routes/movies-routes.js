var express = require('express');
var movieRoute = express.Router();
var movieController = require('../controller/movie-controller');

var router = function(){

	movieRoute.route('/signup')
		.post(function(req,res) {
			return movieController.signup(req, res);
		});

    return movieRoute;
}

module.exports = router;
