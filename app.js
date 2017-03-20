'use strict';

require('regenerator/runtime');

require('./app-helpers/promiseUtils');

require('./private/awsS3Credentials');

var _dao = require('./dataAccess/dao');

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var mkdirp = require('mkdirp');
var exif = require('exif-parser');
var compression = require('compression');

var hour = 3600000;
var rememberMeExpiration = 2 * 365 * 24 * hour; //2 years

app.use(compression());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());
app.use(session({ secret: 'adam_booklist', saveUninitialized: true, resave: true }));

var expressWs = require('express-ws')(app);

app.use('/static/', express.static(__dirname + '/static/'));
app.use('/node_modules/', express.static(__dirname + '/node_modules/'));
app.use('/enter/', express.static(__dirname + '/enter/'));

//var easyControllers = require('easy-express-controllers').easyControllers;
//easyControllers.createAllControllers(app, { fileTest: f => !/-es6.js$/.test(f) });

app.get('/favicon.ico', function (request, response) {
    response.sendFile(path.join(__dirname + '/favicon.ico'));
});

process.on('uncaughtException', error);
process.on('unhandledRejection', error);
process.on('exit', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
    _dao2.default.shutdown();
    process.exit();
}

function error(err) {
    try {
        var logger = new ErrorLoggerDao();
        logger.log('exception', err);
    } catch (e) {}
}