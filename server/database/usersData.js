var Sequelize = require('sequelize');
var models = require("../models/models.js")();
var usermodels = models.usersmodel;



exports.insertusersData = function(data){
	console.log(data);
	return usermodels.create(data);
}

