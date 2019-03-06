var express = require('express');
var userRoute = express.Router();
var userController = require('../controller/user-controller');

var router = function(){

	userRoute.route('/signup')
		.post(function(req,res) {
			return userController.signup(req, res);
		});

    return userRoute;
}
var express = require('express');
var userRoute = express.Router();
var userController = require('../controller/user-controller');

var router = function(){

	userRoute.route('/signup')
		.post(function(req,res) {
			return userController.signup(req, res);
		});

	userRoute.route('/login')
		.post(function(req,res) {
			return userController.login(req, res);
		});

		userRoute.route('/changePassword')
		.post(function(req,res){
			return userController.changePassword(req, res);
		});

    return userRoute;
}

module.exports = router;
