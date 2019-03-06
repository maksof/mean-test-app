var fs = require('fs');
var Common = require(__dirname + '/common-controller');
var logger = require( '../logger' );
var config = require( __dirname + '/../../config' );
const request = require("request");
var sequelize = require('../sequelizeConfig').sequelizeConfig;
var md5 = require('md5');

var models = require('../models/models.js')();
var tbl_user = models.tbl_user;

/**
 * @api {post} user/signup Signup API
 * @apiName Signup API
 * @apiGroup User
 *
 * @apiParam {string} first_name First Name
 * @apiParam {string} last_name Last Name
 * @apiParam {string} password Password
 * @apiParam {string} gender Gender
 * @apiParam {number} age Age
 * @apiParam {string} email Email Address
 * @apiParam {string} phone Phone
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.signup = function (request, response) {
    var user = request.body;
    if(common.required(user.first_name) && common.required(user.last_name) && common.required(user.password) && common.required(user.email) && common.required(user.gender) && common.required(user.age) && common.required(user.phone)) {
        //if email exist, send response back
        tbl_user.findAll({ where: { email: user.email } }).then(function (res) {
            if(res.length > 0) {
                common.sendResponseBack(response, 'FAIL', 'This email is already linked with another account. Please use different email.', null);
            } else {
                user.role = 'USER';
                user.isDeleted = 0;
                user.registerDate = new Date();
                user.password = md5(user.password);
                tbl_user.build(user).save().then(function(result) {
                    common.sendResponseBack(response, 'OK', 'User signup successfully!', result);
                }, (error) => {
                    common.sendResponseBack(response, 'FAIL', 'Some error occured while processing your request, Please try again later.', null);
                    logger.error( 'Error occured on '+new Date()+' with reason' + error);
                });
            }
        });
    }
}

/**
 * @api {get} user/login Login API
 * @apiName Login API
 * @apiGroup User
 *
 * @apiParam {string} password Password
 * @apiParam {string} email Email Address
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.login = function (request, response) {
    
    var user = request.body;
    tbl_user.findAll({ where: { email: user.email, password: user.password } }).then(function (res){
         if(res.length > 0) {
                common.sendResponseBack(response, 'PASS', 'YOUR EMAIL AND PASSWORD ARE CORRECT WAIT FEW SECONDS', null);
            }
            else {
                common.sendResponseBack(response,'FAIL','YOUR EMAIL AND PASSWORD ARE NOT CORRECT TRY AGAIN',null);
                logger.error( 'Error occured on '+new Date()+' with reason' + error);
            }
        }),(error) =>{
            console.log(error);
    }
}

/**
 * @api {post} user/changePassword changePassword API
 * @apiName changePassword API
 * @apiGroup User
 *
 * @apiParam {string} email Email Address
 * @apiParam {string} password Password
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Message corresponding to request.
*/
exports.changePassword = function (request,response) {
    var user = request.body;
    tbl_user.findAll({where : {email : user.email}}).then(function(res){
        if(res.length > 0){
            user.password = md5(user.password);
            tbl_user.update({password : user.password},{where : {email : user.email}}).then(function(result) {
                common.sendResponseBack(response, 'OK', 'YOUR PASSWORD HAS BEEN UPDATED', result);
            });
        }
        else {
            common.sendResponseBack(response,'FAIL','EMAIL DOESNT EXIST ENTER CORRECT EMAIL',null);
            logger.error( 'Error occured on '+new Date()+' with reason' + error);
        }
    }),(error) =>{
         console.log(error);
    }
}
