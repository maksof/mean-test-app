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

/**
 * @api {post} movies/addCategory Add Category API
 * @apiName Add Category API
 * @apiGroup Movies
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
 * @apiGroup Movies
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
 * @apiGroup Movies
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
 * @apiGroup Movies
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