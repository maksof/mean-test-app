var fs = require('fs');
var Common = require(__dirname + '/common-controller');
var logger = require( '../logger' );
var config = require( __dirname + '/../../config' );
const request = require("request");
var sequelize = require('../sequelizeConfig').sequelizeConfig;
var md5 = require('md5');

var models = require('../models/models.js')();
var tbl_movies = models.tbl_movies;
var tbl_categories = models.tbl_categories;
var tbl_time_periods = models.tbl_time_periods;
var tbl_user_favorites = models.tbl_user_favorites;
var tbl_user = models.tbl_user;
var tbl_grades = models.tbl_grades;

/**
 * @api {post} movies/addCategory Add Category API
 * @apiName Add Category API
 * @apiGroup Category
 *
 * @apiParam {string} categoryName Category Name
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.addCategory = function (request, response) {

    var category = request.body;
    if(common.required(category.categoryName)) {
        //if exist, send response back
        tbl_categories.findAll({ where: { categoryName: category.categoryName } }).then(function (res) {
            if(res.length > 0) {
                common.sendResponseBack(response, 'FAIL', 'This category is already present, Please check the name and try again!', null);
            } else {
                category.isDeleted = 0;
                tbl_categories.build(category).save().then(function(result) {
                    common.sendResponseBack(response, 'OK', 'New category is added successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please enter the category name.', null);
    }
}

/**
 * @api {get} movies/deleteCategory Delete Category API
 * @apiName Delete Category API
 * @apiGroup Category
 *
 * @apiParam {number} categoryId Category Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.deleteCategory = function (request, response) {
    
    var categoryId = request.query.categoryId;
    if(common.required(categoryId)) {
        tbl_categories.update({ isDeleted: 1 }, { where: { 'id': categoryId } }).then(function (res) {
            if(res[0] == 1) common.sendResponseBack(response, 'OK', 'Category is deleted successfully!', null);
        }, (error) => {
            common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
            logger.error( 'Error occured on '+new Date()+' with reason' + error);
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please enter the category id.', null);
    }
}

/**
 * @api {post} movies/addTimePeriod Add Time Period API
 * @apiName Add Time Period API
 * @apiGroup Time Period
 *
 * @apiParam {string} timePeriod Time Period
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.addTimePeriod = function (request, response) {
    var timePeriod = request.body;
    if(common.required(timePeriod.timePeriod)) {
        //if exist, send response back
        tbl_time_periods.findAll({ where: { timePeriod: timePeriod.timePeriod } }).then(function (res) {
            if(res.length > 0) {
                common.sendResponseBack(response, 'FAIL', 'This time period is already present, Please check the name and try again!', null);
            } else {
                timePeriod.isDeleted = 0;
                tbl_time_periods.build(timePeriod).save().then(function(result) {
                    common.sendResponseBack(response, 'OK', 'New time period is added successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please enter the time period.', null);
    }
}

/**
 * @api {get} movies/deleteTimePeriod Delete Time Period API
 * @apiName Delete Time Period API
 * @apiGroup Time Period
 *
 * @apiParam {number} timePeriodId Time Period Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.deleteTimePeriod = function (request, response) {

    var timePeriodId = request.query.timePeriodId;
    if(common.required(timePeriodId)) {
        tbl_time_periods.update({ isDeleted: 1 }, { where: { 'id': timePeriodId } }).then(function (res) {
            if(res[0] == 1) common.sendResponseBack(response, 'OK', 'Time Period is deleted successfully!', null);
        }, (error) => {
            common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
            logger.error( 'Error occured on '+new Date()+' with reason' + error);
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please enter the time period id.', null);
    }
}

/**
 * @api {post} movies/addMovie Add Movie API
 * @apiName Add Movie API
 * @apiGroup Movies
 *
 * @apiParam {string} title Title
 * @apiParam {string} year Year
 * @apiParam {string} director Director Name
 * @apiParam {string} description Description
 * @apiParam {string} categoryId Category Id
 * @apiParam {string} distribution Distribution
 * @apiParam {string} photoUrl Photo Url
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.addMovie = function (request, response) {

    var movie = request.body;
    if(common.required(movie.title) && common.required(movie.year) && common.required(movie.director) && common.required(movie.categoryId) && common.required(movie.distribution) && common.required(movie.photoUrl) && common.required(movie.description)) {
        //if exist, send response back
        tbl_movies.findAll({ where: { title: movie.title } }).then(function (res) {
            if(res.length > 0) {
                common.sendResponseBack(response, 'FAIL', 'This movie is already present, Please check the name and try again!', null);
            } else {
                movie.isDeleted = 0;
                movie.isApproved = 1;
                tbl_movies.build(movie).save().then(function(result) {
                    common.sendResponseBack(response, 'OK', 'New movie is added successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass all the fields.', null);
    }
}

/**
 * @api {post} movies/updateMovie Update Movie API
 * @apiName Update Movie API
 * @apiGroup Movies
 *
 * @apiParam {number} id Movie Id
 * @apiParam {string} title Title
 * @apiParam {string} year Year
 * @apiParam {string} director Director Name
 * @apiParam {string} categoryId Category Id
 * @apiParam {string} distribution Distribution
 * @apiParam {string} photoUrl Photo Url
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.updateMovie = function (request, response) {

    var movie = request.body;
    var movieId = movie.id;
    delete movie.id;
    if(common.required(movieId) && common.required(movie.title) && common.required(movie.year) && common.required(movie.director) && common.required(movie.categoryId) && common.required(movie.distribution) && common.required(movie.photoUrl) ) {
        //if exist, send response back
        tbl_movies.findAll({ where: { id: movieId } }).then(function (res) {
            if(res.length > 0) {
                movie.isDeleted = res[0].isDeleted;
                movie.isApproved = res[0].isApproved;
                tbl_movies.update(movie, { where: { 'id': movieId } }).then(function (res) {
                    if(res[0] == 1) common.sendResponseBack(response, 'OK', 'Movie is updated successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });                
            } else {
                common.sendResponseBack(response, 'FAIL', 'Incorrect Movie Id, Please try again with correct movie id!', null);
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass all the fields.', null);
    }
}

/**
 * @api {get} movies/deleteMovie Delete Movie API
 * @apiName Delete Movie API
 * @apiGroup Movies
 *
 * @apiParam {number} movieId Movie Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.deleteMovie = function (request, response) {

    var movieId = request.query.movieId;
    if(common.required(movieId)) {
        //if exist, send response back
        tbl_movies.findAll({ where: { id: movieId } }).then(function (res) {
            if(res.length > 0) {
                tbl_movies.update({isDeleted: 1}, { where: { 'id': movieId } }).then(function (res) {
                    if(res[0] == 1) common.sendResponseBack(response, 'OK', 'Movie is deleted successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });                
            } else {
                common.sendResponseBack(response, 'FAIL', 'Incorrect Movie Id, Please try again with correct movie id!', null);
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass the movie id!', null);
    }
}

/**
 * @api {post} movies/suggestMovie Suggest New Movie API For User
 * @apiName Suggest New Movie API For User
 * @apiGroup Movies
 *
 * @apiParam {string} title Title
 * @apiParam {string} year Year
 * @apiParam {string} director Director Name
 * @apiParam {string} categoryId Category Id
 * @apiParam {string} distribution Distribution
 * @apiParam {string} photoUrl Photo Url
 * @apiParam {string} isDeleted Is Deleted Key
 * @apiParam {string} isApproved Is Approved Key
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.suggestMovie = function (request, response) {

    var movie = request.body;
    if(common.required(movie.title) && common.required(movie.year) && common.required(movie.director) && common.required(movie.categoryId) && common.required(movie.distribution) && common.required(movie.photoUrl) ) {
        //if exist, send response back
        tbl_movies.findAll({ where: { title: movie.title } }).then(function (res) {
            if(res.length > 0) {
                common.sendResponseBack(response, 'FAIL', 'This movie is already present, Please check the name and try again!', null);
            } else {
                movie.isDeleted = 0;
                movie.isApproved = 0;
                tbl_movies.build(movie).save().then(function(result) {
                    common.sendResponseBack(response, 'OK', 'New movie is added successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass all the fields.', null);
    }
}


/**
 * @api {get} movies/acceptSuggestedMovie Accept Suggested Movie API
 * @apiName Accept Suggested Movie API
 * @apiGroup Movies
 *
 * @apiParam {number} movieId Movie Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.acceptSuggestedMovie = function (request, response) {

    var movieId = request.query.movieId;
    if(common.required(movieId)) {
        tbl_movies.findAll({ where: { 'id': movieId } }).then(function(movie) {
            movie = movie[0];
            if(movie.isApproved == 0) {
                tbl_movies.update({ isApproved: 1 }, { where: { 'id': movieId } }).then(function (res) {
                    if(res[0] == 1) common.sendResponseBack(response, 'OK', 'Movie is accepted successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });                
            } else common.sendResponseBack(response, 'OK', 'Movie is accepted successfully!', null);
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass the movie id.', null);
    }
}

/**
 * @api {get} movies/getSuggestedMovie Get Suggested Movie API
 * @apiName Get Suggested Movie API
 * @apiGroup Movies
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.getSuggestedMovie = function (request, response) {

    tbl_movies.findAll({ where: { 'isApproved': 0, 'isDeleted': 0 } }).then(function(movies) {
        if(movies.length > 0) common.sendResponseBack(response, 'OK', 'Suggested movies fetched successfully!', movies);
        else common.sendResponseBack(response, 'OK', 'No records found!', null);
    }, (error) => {
        common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
        logger.error( 'Error occured on '+new Date()+' with reason' + error);
    });
}

/**
 * @api {get} movies/rejectSuggestedMovie Reject Suggested Movie API
 * @apiName Reject Suggested Movie API
 * @apiGroup Movies
 *
 * @apiParam {number} movieId Movie Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.rejectSuggestedMovie = function (request, response) {

    var movieId = request.query.movieId;
    if(common.required(movieId)) {
        tbl_movies.findAll({ where: { 'id': movieId } }).then(function(movie) {
            movie = movie[0];
            if(movie.isDeleted == 0) {
                tbl_movies.update({ isDeleted: 1 }, { where: { 'id': movieId } }).then(function (res) {
                    if(res[0] == 1) common.sendResponseBack(response, 'OK', 'Movie is rejected successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });                
            } else common.sendResponseBack(response, 'OK', 'Movie is rejected successfully!', null);
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass the movie id.', null);
    }
}

/**
 * @api {get} movies/getAllCategories Get All Categories API
 * @apiName Get All Categories API
 * @apiGroup Category
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.getAllCategories = function (request, response) {

    tbl_categories.findAll({ attributes: ['id', 'categoryName'], where: { 'isDeleted': 0 } }).then(function(categories) {
        if(categories.length > 0) common.sendResponseBack(response, 'OK', 'Categories fetched successfully!', categories);
        else common.sendResponseBack(response, 'OK', 'No records found!', null);
    }, (error) => {
        common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
        logger.error( 'Error occured on '+new Date()+' with reason' + error);
    });
}

/**
 * @api {get} movies/getAllTimePeriods Get All Time Periods API
 * @apiName Get All Time Periods API
 * @apiGroup Time Period
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.getAllTimePeriods = function (request, response) {

    tbl_time_periods.findAll({ attributes: ['id', 'timePeriod'], where: { 'isDeleted': 0 } }).then(function(timePeriods) {
        if(timePeriods.length > 0) common.sendResponseBack(response, 'OK', 'Time periods fetched successfully!', timePeriods);
        else common.sendResponseBack(response, 'OK', 'No records found!', null);
    }, (error) => {
        common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
        logger.error( 'Error occured on '+new Date()+' with reason' + error);
    });
}

/**
 * @api {post} movies/addMovieToFavorites Add Movie to Favorites API
 * @apiName Add Movie to Favorites API
 * @apiGroup Favorites
 *
 * @apiParam {number} userId User Id
 * @apiParam {number} movieId Movie Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.addMovieToFavorites = function (request, response) {

    var data = request.body;
    if(common.required(data.userId) && common.required(data.movieId)) {
        //if exist, send response back
        tbl_user_favorites.findAll({ where: { userId: data.userId, movieId: data.movieId } }).then(function (res) {
            if(res.length > 0) {
                common.sendResponseBack(response, 'FAIL', 'This movie is already added to your favorite list!', null);
            } else {
                data.date = new Date();
                tbl_user_favorites.build(data).save().then(function(result) {
                    common.sendResponseBack(response, 'OK', 'Movie is added to your favorite list successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass all the required fields.', null);
    }
}

/**
 * @api {post} movies/removeMovieFromFavorites Remove Movie From Favorites API
 * @apiName Remove Movie From Favorites API
 * @apiGroup Favorites
 *
 * @apiParam {number} userId User Id
 * @apiParam {number} movieId Movie Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.removeMovieFromFavorites = function (request, response) {

    var data = request.body;
    if(common.required(data.userId) && common.required(data.movieId)) {
        //if exist, send response back
        tbl_user_favorites.findAll({ where: { userId: data.userId, movieId: data.movieId } }).then(function (res) {
            if(res.length == 0) {
                common.sendResponseBack(response, 'FAIL', 'Incorrect details passed, please check and try again!', null);
            } else {
                tbl_user_favorites.destroy({ where: { userId: data.userId, movieId: data.movieId } }).then(function(result) {
                    common.sendResponseBack(response, 'OK', 'Movie is removed from favorite list successfully!', null);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });
    } else {
        common.sendResponseBack(response, 'FAIL', 'Please pass all the required fields.', null);
    }
}

/**
 * @api {get} movies/getAllFavoritesMoviesOfUser Get All Favorites Movie of User API
 * @apiName Get All Favorites Movie of User API
 * @apiGroup Favorites
 *
 * @apiParam {number} userId User Id
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.getAllFavoritesMoviesOfUser = function (request, response) {
    var userId = request.query.userId;
    if(common.required(userId)) {
        tbl_user_favorites.findAll({attributes:['movieId'], where: { 'userId': userId } }).then(function(favorites) {
            if(favorites.length > 0) {
                var movieIdArr = [];
                favorites.forEach(function(id) {movieIdArr.push(id.movieId);})
                tbl_movies.findAll({where: {id: movieIdArr}}).then(function(movies){
                    common.sendResponseBack(response, 'OK', 'Favorites movies fetched successfully!', movies);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);        
                })
            } else common.sendResponseBack(response, 'OK', 'No records found!', null);
        }, (error) => {
            common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
            logger.error( 'Error occured on '+new Date()+' with reason' + error);
        });
    } else common.sendResponseBack(response, 'FAIL', 'Please pass the user id.', null);
}

/**
 * @api {get} movies/getMovies Get Movies API
 * @apiName Get Movies API
 * @apiGroup Movies
 * @apiParam {number} userId user Id
 * @apiParam {string} title Title
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.getMovies = function (request, response) {
    var userId = request.query.userId; 
    if(common.required(userId)) {
	    var categoryId = request.query.categoryId ? request.query.categoryId : '';
	    var title = request.query.title ? request.query.title : '';
	    if(categoryId) whereClause.categoryId = categoryId;
	    if(title) whereClause.title = { $like: title };
	    tbl_movies.belongsTo(tbl_grades, {foreignKey:'id',targetKey : 'movieId'});
	    var query = { 
            attributes : ['categoryId','title','year','director','distribution','description','photoUrl'],
            where : {'isDeleted': 0, 'isApproved': 1},
            include : [{
                required : false,
                model : tbl_grades,
                where : {'userId' : userId}
	        }]
	    }
	    tbl_movies.findAll(query)
	    .then(function(movies) {
	        common.sendResponseBack(response,'OK','data fetched successfully',movies)
	    }, (error) => {
	        console.log("error",error)
	        common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
	        logger.error( 'Error occured on '+new Date()+' with reason' + error);
	    });
    }  else common.sendResponseBack(response, 'FAIL', 'Please pass the userId.', null);
}

/**
 * @api {post} movies/gradeMovies Grade Movies API
 * @apiName Grade Movies API
 * @apiGroup Movies
 *
 * @apiParam {number} userId User Id
 * @apiParam {number} movieId movie Id 
 * @apiParam {number} grade Grade 
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/

exports.gradeMovies = function(request,response) {
    var data = request.body;
    data.date = new Date();
    if(common.required(data.userId) && common.required(data.movieId) && common.required(data.grade)) {
        tbl_grades.findAll({where : {userId: data.userId, movieId: data.movieId}}).then(function(res) {
            if(res.length>0) {
                tbl_grades.update({grade : data.grade},{where :{movieId : data.movieId}}).then(function(result){
                    common.sendResponseBack(response, 'OK', 'grade updated successfully!', res);
                });
            } else {
                tbl_grades.build(data).save().then(function(result){
                    common.sendResponseBack(response, 'OK', 'grade added successfully!', result);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });   
    } else common.sendResponseBack(response, 'FAIL', 'Please pass all the required details.', null);
}

/**
 * @api {get} movies/viewGradeMovies View Grade Movies API
 * @apiName View Grade Movies API
 * @apiGroup Movies
 *
 * @apiParam {number} limit Limit of records
 * @apiParam {number} offset Offset
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.viewGradeMovies = function(request,response) {
    
    var limit = request.query.limit? parseInt(request.query.limit) : 10;
    var offset = request.query.offset? parseInt(request.query.offset) : 0;

    tbl_grades.belongsTo(tbl_movies, { foreignKey: 'movieId' });
    tbl_grades.belongsTo(tbl_user, { foreignKey: 'userId' });

    tbl_grades.findAndCountAll({ 
        attributes: ['grade', 'date'],
        include: [
            {
                model: tbl_movies,
                attributes: ['id', 'title']
            },
            {
                model: tbl_user,
                attributes: ['first_name', 'last_name']
            }
        ],
        limit: limit,
        offset: offset,
        order: '"date" DESC',
    }).then(function (res) {
        if(res.rows.length >0){
            common.sendResponseBack(response,'OK','records fetched successfully.', {data: res.rows,total : res.count});
        } else {
            common.sendResponseBack(response,'OK','No records found!',null);
        }
    }, (error) => {
        common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
        logger.error( 'Error occured on '+new Date()+' with reason' + error);
    });     
}

/**
 * @api {get} movies/movieWithTimePeriodBasis Movie With Time Period Basis
 * @apiName Movie With Time Period Basis
 * @apiGroup Movies
 *
 * @apiParam {string} years Years
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/

exports.movieWithTimePeriodBasis = function(req,res){
    if(!req.query.periodId) return res.status(200).json({success : false ,"msg" : "years is missing"})
    var periodId = req.query.periodId;
    var rangeMovies = [];
    tbl_time_periods.findAll({where:{id:periodId}}).then(function(results){
        var timePeriod = results[0].dataValues.timePeriod.split('-');
        console.log(timePeriod)
        tbl_movies.findAll({where : {
            year : {
                $between : timePeriod
            }
        }}).then(function(movies){
            if(movies.length === 0 ) return res.status(403).json({success : false ,"msg" : "No record found!"})
            res.status(200).json({"movies" : movies ,"msg" : "fetched successfully"})
        })
    })
}

