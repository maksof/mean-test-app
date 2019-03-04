// Dependencies
var winston = require( 'winston' );
var config = require( __dirname + '/../config' );

// Setup the logger
let logger = winston.createLogger({
    transports: [
      new (winston.transports.Console)(),
	  new (winston.transports.File)({ name: 'file#error', filename: config.logger.errorFile, level: 'error', 
	  maxsize: config.logger.maxFileSize, maxFiles: config.logger.maxFiles }),
	  new (winston.transports.File)({ name: 'file#info', filename: config.logger.consoleFile, maxsize: config.logger.maxFileSize, maxFiles: config.logger.maxFiles })
    ]
});

// Make the logger available to all
module.exports = logger;
