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

	movieRoute.route('/getAllCategories')
		.get(function(req,res) {
			return movieController.getAllCategories(req, res);
		});

	movieRoute.route('/addTimePeriod')
		.post(function(req,res) {
			return movieController.addTimePeriod(req, res);
		});

	movieRoute.route('/deleteTimePeriod')
		.get(function(req,res) {
			return movieController.deleteTimePeriod(req, res);
		});

	movieRoute.route('/getAllTimePeriods')
		.get(function(req,res) {
			return movieController.getAllTimePeriods(req, res);
		});

	movieRoute.route('/addMovie')
		.post(function(req,res) {
			return movieController.addMovie(req, res);
		});

	movieRoute.route('/updateMovie')
		.post(function(req,res) {
			return movieController.updateMovie(req, res);
		});

	movieRoute.route('/deleteMovie')
		.get(function(req,res) {
			return movieController.deleteMovie(req, res);
		});

	movieRoute.route('/suggestMovie')
		.post(function(req,res) {
			return movieController.suggestMovie(req, res);
		});

	movieRoute.route('/acceptSuggestedMovie')
		.get(function(req,res) {
			return movieController.acceptSuggestedMovie(req, res);
		});

	movieRoute.route('/rejectSuggestedMovie')
		.get(function(req,res) {
			return movieController.rejectSuggestedMovie(req, res);
		});

    return movieRoute;
}

module.exports = router;
