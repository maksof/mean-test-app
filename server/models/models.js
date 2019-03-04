var Sequelize = require('sequelize');
var sequelize = require('../sequelizeConfig').sequelizeConfig;

var model = function(){
	var models = {};
    models.tbl_user = sequelize.import('./tbl_user.js');

	return models;
}
module.exports = model;