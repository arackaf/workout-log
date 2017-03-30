import 'regenerator/runtime';

const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const compression = require('compression');

const hour = 3600000;
const rememberMeExpiration = 2 * 365 * 24 * hour; //2 years

app.use(compression());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());
app.use(session({ secret: 'adam_booklist', saveUninitialized: true, resave: true }));

app.use('/util/', express.static(__dirname + '/util/'));
app.use('/dist/', express.static(__dirname + '/dist/'));
app.use('/static/', express.static(__dirname + '/static/'));
app.use('/node_modules/', express.static(__dirname + '/node_modules/'));
app.use('/enter/', express.static(__dirname + '/enter/'));


var easyControllers = require('easy-express-controllers').easyControllers;
easyControllers.createAllControllers(app);

app.get('/favicon.ico', function (request, response) {
    response.sendFile(path.join(__dirname + '/favicon.ico'));
});

app.get('/enter', function (request, response) {
    response.sendFile(path.join(__dirname + '/enter/enter.htm'));
});

process.on('uncaughtException', error);
process.on('unhandledRejection', error);
process.on('exit', shutdown);
process.on('SIGINT', shutdown);

function shutdown(){
    process.exit();
}

function error(err){
    try{
        let logger = new ErrorLoggerDao();
        logger.log('exception', err);
    } catch(e) { }
}

app.listen(process.env.PORT || 3000);