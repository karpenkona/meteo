var fs = require('fs');
var mongoose = require('mongoose');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload/img/')
    },
    filename: function(req, file, callback) {
        var a = file.originalname.split('.')[0];
        callback(null, a + '-' + Date.now() + path.extname(file.originalname))
    },
    limits: {
        fieldNameSize: 100,
        files: 4,
        fields: 10}
});

var hskey = fs.readFileSync('sslcert/private.key');
var hscert = fs.readFileSync('sslcert/meteohub_pro.crt')
var options = {
    key: hskey,
    cert: hscert
};
var express = require('express'),
    app = express()
    , https = require('https')
    , server = https.createServer(options,app);
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
// listen for new web clients:
server.listen(443);
// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
var config = require('./config/config');
var index=require('./rout/index');
var wether=require('./rout/wether');
var my=require('./rout/my');
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('./upload'));
app.use(express.static('static'));
app.use(express.static('data'));
app.use(bodyParser.urlencoded({ extended: false, uploadDir: './upload' }));
app.use(cookieParser());
app.use( session({
        secret : 's3Cur3',
        name : 'sessionId',
        cookie: { maxAge: 6000000}
    })
);
function logger(req, res, next) {
    if(req.session.user){
        next()
    }
    else {
        res.redirect('/login');
}}
app.use('/', index);
app.use('/wether', wether);
app.use('/my', logger, my);
app.get('/login', (req, res)=>{
    res.render('login')
});

var upload = multer({ storage : storage}).single('image');

app.post('/login', (req, res)=>{
        upload(req, res, err=>{
            console.log(req.body.email);
            console.log(req.body.password);
            if (req.body.email=='33admin22' || req.body.password=='22admin33' ){
                req.session.user = 'admin';
                res.redirect('/my')
            }
            else{
                res.render('login', {messege: 'не корректный пароль'})
            }
        })
    });


