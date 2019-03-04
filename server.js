// Include Modules
var  express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
var cors = require('cors');
const requestIp = require("request-ip");

// Define Modules
app.use(cors());
app.options('*',cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(requestIp.mw());

//Use Sequelize Module to established connection with database
var sequelize = require('./server/sequelizeConfig.js').sequelizeConfig;
app.use(express.static('app'));
//api of sign up of users

var usersRoutes = require("./server/routes/usersRoutes.js")();
app.use('/signup',usersRoutes);

sequelize.authenticate().then(() => {
	app.listen(port , function(err){
		if(err) console.log(err);
		console.log("Server is running and listening on port ",port);
	});
	console.log("Database connection established sucessfully!");
}).catch(error => {
	console.log("Database connection not established!");
});