var Sequelize = require('sequelize');
var sequelize = require('../sequelizeConfig').sequelizeConfig;


var model = function(){
	var models = {};
    models.usersmodel = sequelize.import('./tblUsers.js');


		return models;
}
module.exports = model;