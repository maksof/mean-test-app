var express = require('express');
var movieRoute = express.Router();
var movieController = require('../controller/movie-controller');

var router = function(){

	movieRoute.route('/addCategory')
		.post(function(req,res) {
			return movieController.addCategory(req, res);
		});

	movieRoute.route('/deleteCategory')
		.get(function(req,res) {
			return movieController.deleteCategory(req, res);
		});

	movieRoute.route('/addTimePeriod')
		.post(function(req,res) {
			return movieController.addTimePeriod(req, res);
		});

	movieRoute.route('/deleteTimePeriod')
		.get(function(req,res) {
			return movieController.deleteTimePeriod(req, res);
		});

    return movieRoute;
}

module.exports = router;
