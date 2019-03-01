var express = require('express');
var accrouter = express.Router();
var bodyParser = require('body-parser');


var usersController = require('/controller/usersController.js');

var router = function(){
	accrouter.route('/cretaeadmindata')
	.post(function(req,res){
		console.log("reached in adminController function");
	    return usersController.insertusersData(req,res);