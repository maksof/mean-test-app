var Sequelize = require('sequelize');
var config = require( __dirname + '/../config' );

var db_cred = {
    db: config.db.database,
    user: config.db.username,
    pass: config.db.password,
    host: config.db.host
};

if(config.db.connect) {

    var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
        dialectOptions: {
            timeout: 3000
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
    module.exports.sequelizeConfig = sequelize;
}