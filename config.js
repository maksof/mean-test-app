/**
 * This module is responsible for maintaining all configurations
 * that are used site wide.
 */
var config = {}

// Application Information
config.app = {}
config.app.mode = {}
config.app.user = {}
config.app.errorUrl   = '/error';
config.app.mode.DEVELOPMENT = 'development';
config.app.mode.PRODUCTION = 'production';
config.app.mode.current = config.app.mode.PRODUCTION;

// HTTP server configuration
config.http = {}
config.http.port = (config.app.mode.current == config.app.mode.DEVELOPMENT ) ? 3000 : 3000;
config.http.enableSSL = false;

// Log files
config.logger = {}
config.logger.errorFile = __dirname + '/server/logs/error.log';
config.logger.consoleFile = __dirname + '/server/logs/console.log';
config.logger.maxFileSize = 1000000;
config.logger.maxFiles = 1;

// Db Configuration
config.db = {}
config.db.host = (config.app.mode.current == config.app.mode.PRODUCTION ) ? 'localhost' : 'localhost'; 
config.db.username = (config.app.mode.current == config.app.mode.PRODUCTION ) ? 'root' : 'pma'; 
config.db.password = (config.app.mode.current == config.app.mode.PRODUCTION ) ? '' : ''; 
config.db.database = (config.app.mode.current == config.app.mode.PRODUCTION ) ? 'mean-app' : 'test'; 
config.db.port = 3306;
config.db.dialect = 'mysql';
config.db.connect = true;

config.host = {}
config.host.url = (config.app.mode.current == config.app.mode.DEVELOPMENT ) ? 'http:localhost:4200/' : 'http:localhost:4200/';

module.exports = config;