
var http = require("http");
var express = require('express');
var Sequelize = require('sequelize');

var sequelize = require('../sequelizeConfig').sequelizeConfig;
var models = require("../models/models.js")();
var usermodels = models.usersmodel;
var usersData = require('../database/usersData.js');

// api of Sign up of users
exports.insertusersData = function(req,res){
          var data = req.body;
          console.log(data);   
	    usersData.insertusersData(data)
	    .then(function(data){
	    	res.send({
	    		data : data
	    	});
	    });
}