import 'regenerator/runtime';

require('dotenv').config();

const express = require('express');
const upload = require('jquery-file-upload-middleware');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const compression = require('compression');

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';


let s3bucket = new AWS.S3({params: {Bucket: 'tribe-uploads'}}),
                    params = {
                        Key: `temp/ab.txt`,
                        Body: "First upload test"
                    };

// s3bucket.upload(params, function (err) {
//     if (err) console.log('error', err);
//     else console.log(`http://tribe-uploads.s3-website-us-east-1.amazonaws.com/${params.Key}`);
// });

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

upload.configure({
    uploadDir: __dirname + '/uploads',
    uploadUrl: '/upload'
});
upload.on('end', function (fileInfo, req, res) {
    fs.readFile('./uploads/' + fileInfo.name, (err, data) => {
        if (err) return;

        let s3bucket = new AWS.S3({params: {Bucket: 'tribe-uploads'}}),
            params = {
                Key: `uploadVideos/${fileInfo.name}`,
                Body: data
            };

            s3bucket.upload(params, function (err) {
                if (err) rej(err);
                else {
                    var elastictranscoder = new AWS.ElasticTranscoder({region: 'us-west-2'});

                    var params = {
                        PipelineId: '1493873425750-15u5g1', /* required */
                        Inputs: [{
                            Key: `uploadVideos/${fileInfo.name}`,
                        }],
                        OutputKeyPrefix: 'transcoded/',
                        Outputs: [{
                            Key: 'iPhone/' + fileInfo.name,
                            PresetId: '1351620000001-100020'
                        }, {
                            Key: 'iPhone2/' + fileInfo.name,
                            PresetId: '1351620000001-100020'
                        }],
                    };
                    elastictranscoder.createJob(params, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else     console.log('HOORAY', data);           // successful response
                    });
                    
                    //res(`http://my-library-cover-uploads.s3-website-us-east-1.amazonaws.com/${params.Key}`);
                }
            });
    });

    // let s3bucket = new AWS.S3({params: {Bucket: 'tribe-uploads'}}),
    //                 params = {
    //                     Key: `temp/ab.txt`,
    //                     Body: "First upload test"
    //                 };

    // s3bucket.upload(params, function (err) {
    //     if (err) console.log('error', err);
    //     else console.log(`http://tribe-uploads.s3-website-us-east-1.amazonaws.com/${params.Key}`);
    // });
});
app.use('/upload', upload.fileHandler());

var easyControllers = require('easy-express-controllers').easyControllers;
easyControllers.createAllControllers(app);

app.get('/favicon.ico', function (request, response) {
    response.sendFile(path.join(__dirname + '/favicon.ico'));
});

app.get('/enter', function (request, response) {
    response.sendFile(path.join(__dirname + '/enter/enter.htm'));
});

app.get('/workoutSearch', function (request, response) {
    response.sendFile(path.join(__dirname + '/workoutSearch/workoutSearch.htm'));
});

app.get('/today', function (request, response) {
    response.sendFile(path.join(__dirname + '/today/today.htm'));
});

// app.post('/upload/video', function (req, response) {
//     debugger;
//     if (req.fileUploaded) {
//         console.log('size === ', req.fileUploaded.size);
//     } else {
//         console.log('no file found :(')
//     }
//     return response.send({ success: false, error: 'Max size is 500K' });
// });

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