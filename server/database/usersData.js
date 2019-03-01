var Sequelize = require('sequelize');
var models = require("../models/models.js")();
var usermodels = models.usersmodel;



exports.createUser = function(data){
	return usermodels.create(data);
}

