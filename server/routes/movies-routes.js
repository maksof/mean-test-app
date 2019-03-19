var express = require('express');
var movieRoute = express.Router();
var movieController = require('../controller/movie-controller');

var router = function(){

	/*CATEGORY APIS*/
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

	/*TIME PERIOD APIS*/
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

	/*MOVIE APIS*/
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

	movieRoute.route('/getMovies')
	.get(function(req,res) {
		return movieController.getMovies(req, res);
	});

	movieRoute.route('/suggestMovie')
		.post(function(req,res) {
			return movieController.suggestMovie(req, res);
		});

	movieRoute.route('/getSuggestedMovie')
		.get(function(req,res) {
			return movieController.getSuggestedMovie(req, res);
		});

	movieRoute.route('/acceptSuggestedMovie')
		.get(function(req,res) {
			return movieController.acceptSuggestedMovie(req, res);
		});

	movieRoute.route('/rejectSuggestedMovie')
		.get(function(req,res) {
			return movieController.rejectSuggestedMovie(req, res);
		});

	/*FAVORITE MOVIE APIS*/
	movieRoute.route('/addMovieToFavorites')
		.post(function(req,res) {
			return movieController.addMovieToFavorites(req, res);
		});

	movieRoute.route('/removeMovieFromFavorites')
		.post(function(req,res) {
			return movieController.removeMovieFromFavorites(req, res);
		});

	movieRoute.route('/getAllFavoritesMoviesOfUser')
		.get(function(req,res) {
			return movieController.getAllFavoritesMoviesOfUser(req, res);
		});

	/*GRADE MOVIE APIS*/
	movieRoute.route('/gradeMovies')
		.post(function(req,res) {
			return movieController.gradeMovies(req, res);
		});	

	movieRoute.route('/viewGradeMovies')
		.get(function(req,res) {
			return movieController.viewGradeMovies(req, res);
		});

	movieRoute.route('/getAllCategoriesMoviesGradeWise')
		.get(function(req,res){
			return movieController.getAllGradeAndCategoriesWiseMovies(req,res);
		});

	movieRoute.route('/movieWithTimePeriodBasis')
		.get(function(req,res) {
			return movieController.movieWithTimePeriodBasis(req, res);
		});

	movieRoute.route('/movieWithCategoryBasis')
		.get(function(req,res) {
			return movieController.movieWithCategoryBasis(req, res);
		});

	movieRoute.route('/getStatsOnAgeBasis')
		.get(function(req,res) {
			return movieController.getStatsOnAgeBasis(req, res);
		});

    return movieRoute;
}

module.exports = router;
