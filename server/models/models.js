var Sequelize = require('sequelize');
var sequelize = require('../sequelizeConfig').sequelizeConfig;

var model = function(){
	var models = {};
    models.tbl_user = sequelize.import('./tbl_user.js');
    models.tbl_movies = sequelize.import('./tbl_movies.js');
    models.tbl_categories = sequelize.import('./tbl_categories.js');
    models.tbl_time_periods = sequelize.import('./tbl_time_periods.js');
    models.tbl_user_favorites = sequelize.import('./tbl_user_favorites.js');

	return models;
}
module.exports = model;