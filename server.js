// add module
var  express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3636;
var cors = require('cors');
const requestIp = require("request-ip");

// use modules

app.use(cors());
app.options('*',cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(requestIp.mw());


var sequelize = require('./server/sequelizeConfig.js').sequelizeConfig;


sequelize.authenticate().then(() => {
	app.listen(port , function(err){
		if(err) console.log(err);
		console.log("port runnig on",port);
	});
	console.log("connection has been established sucessfully");
}).catch(error => {
	console.log("Unable to connect database " ,port);
});