// Include Modules
var  express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var path = require('path');
const requestIp = require('request-ip');
var helmet = require('helmet');
var compression = require('compression');

var app = express();
var port = process.env.PORT || 3000;

//config file
var config = require( __dirname + '/config' );

// logger for logging to file and console
var logger = require( __dirname + '/server/logger' );

// Define Modules
app.use(cors());
app.options('*',cors());

//Use Sequelize Module to established connection with database
var sequelize = require('./server/sequelizeConfig.js').sequelizeConfig;
var models = require('./server/models/models.js')();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(requestIp.mw());
app.use(helmet());

/*USER AUTHENTICATION API'S ROUTE*/
var usersRoutes = require('./server/routes/user-routes')();
app.use('/api/user', usersRoutes);

/*MOVIES API'S ROUTE*/
var moviesRoutes = require('./server/routes/movies-routes')();
app.use('/api/movies', moviesRoutes);

/*STATS API'S ROUTE*/
var statsRoutes = require('./server/routes/stats-routes')();
app.use('/api/stats', statsRoutes);

/*SERVER BUILD UP*/
app.use(express.static(path.join(__dirname, 'dist')));
app.use(compression());

app.get('/api/health', (req, res) => {
    res.send({
        status: 'OK',
        message: 'Server is listening on port ' + config.http.port + ' with SSL ' + config.http.enableSSL
    });
});

app.get(['/', 'login', 'signUp', 'forgotPassword', 'dashboard', 'suggest-movie', 'favorites', 'movies', 'admin', 'add-categories', 'add-movies', 'suggested-movies', 'view-grades'], function ( req, res ) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(function(req, res){
    res.sendFile(path.join(__dirname, '404.html'));
});

/*DATABASE CONNECTION*/
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection established sucessfully!");
        app.listen(config.http.port, function (err) {
            if (err) console.log(err);
            logger.info( 'Listening on port ' + config.http.port + ' with SSL ' + config.http.enableSSL );
        });
    })
    .catch(err => {
        console.log("Database connection not established due to ", err);
    });