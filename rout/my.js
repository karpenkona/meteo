var express = require('express');
var im = require('imagemagick');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var  daoCategory=require('../dao/category');
var daoNews = require('../dao/news');
const config = require('../config/config');
var path = require('path');
var multer  = require('multer');
//var im = require('imagemagick');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.connect(config.mongoose.uri, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload/article/img/')
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
var storage2 = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload/article/img/')
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
var bodyParser = require('body-parser');
router.get('/', (req, res)=>{
    daoNews.getlastN(50).then(function (data) {
        console.log('////////////////////////////////////// ');
        console.log('данные получены '+ data);
        res.render('my/index', {news:data})
    }, function () {
        res.send('error')
    })

});
router.get('/newcategory', (req, res)=>{
    daoCategory.getAllActive().then(function (cat) {
        res.render('my/newcategory', {cat:cat})
    }, function () {
        res.render('my/newcategory')
    })

});
router.post('/newcategory', multer({storage: storage}).single('image'), function (req, res) {
    daoCategory.create(req.body).then(function (data) {
        res.redirect('/my/newcategory')

    }, function (err) {
        res.render('my/newcategory', {err: err})


    })


});
router.get('/addnews', (req, res)=>{
    daoCategory.getAllActive().then(function (cat) {
        res.render('my/addnews', {cat:cat})
    }, function (err) {
        if (err){
            res.render('my/err', {err:err})
        }
        else {
            res.send('error')
        }

    })

});
var upload = multer({ storage : storage2}).single('image');
router.post('/addnews', function (req, res) {


    upload(req, res, function (err)  {
        var oneNew={};
        if (err) {
            console.log('какая то ошибка загрузчика'+ err);
            res.send('errorr upload')
        }
        else {
            try {

                oneNew = {
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    fulltext: req.body.fulltext,
                    pubDate: new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000)+7200000),
                    comments: '',
                    img: req.file.filename,
                    active: publish=str2bool(req.body.active),
                    top: str2bool(req.body.top),
                    ads: str2bool(req.body.ads)
                };
                daoNews.create(oneNew);
                //console.log("уникальная новость с картинкой // "+oneNew.title+' // создана');
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/300/'+req.file.filename,
                    width:   300,
                    quality: 0.3
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/100/'+req.file.filename,
                    width:   100,
                    height: 80,
                    quality: 0.5
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/700/'+req.file.filename,
                    width:   700,
                    quality: 0.6
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/200-140/'+req.file.filename,
                    width:   200,
                    height: 140,
                    quality: 0.5
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                res.redirect('/my/addnews');
            }catch (err){
                oneNew = {
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    fulltext: req.body.fulltext,
                    pubDate: new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000)+7200000),
                    comments: '',
                    img: '',
                    active: publish=str2bool(req.body.active),
                    top: str2bool(req.body.top),
                    ads: str2bool(req.body.ads)

                };
                daoNews.create(oneNew);
                console.log("уникальная новость без картинки // "+oneNew.title+' // создана');
                res.redirect('/my/addnews');
            }
        }
    })});
router.get('/updnews/:id', (req, res)=>{
    var id=req.params.id;
    console.log('id новости: '+ id);
    daoNews.findNewsById(id).then(function (result) {

        daoCategory.getAllActive().then(function (cat) {
            res.render('my/updnews', {cat:cat, one: result})
        }, function (err) {
            if (err){
                res.render('my/err', {err:err})
            }
            else {
                res.send('error')
            }

        })
    })


});
router.post('/updnews/:id', function (req, res) {


    upload(req, res, function (err)  {
        var oneNew={};
        var id=req.params.id;
        console.log('id новости: '+ id);
        if (err) {
            console.log('какая то ошибка загрузчика'+ err);
            res.send('errorr upload')
        }
        else {
            try {

                oneNew = {
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    fulltext: req.body.fulltext,
                    pubDate: new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000)+7200000),
                    img: req.file.filename,
                    active: publish=str2bool(req.body.active),
                    top: str2bool(req.body.top),
                    ads: str2bool(req.body.ads)

                };
                daoNews.update(id, oneNew);
                //console.log("уникальная новость с картинкой // "+oneNew.title+' // отредактирована');
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/300/'+req.file.filename,
                    width:   300,
                    quality: 0.3
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/100/'+req.file.filename,
                    width:   100,
                    height: 80,
                    quality: 0.5
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/700/'+req.file.filename,
                    width:   700,
                    quality: 0.6
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                im.resize({
                    srcPath: './upload/article/img/'+req.file.filename,
                    dstPath: './upload/article/img/200-140/'+req.file.filename,
                    width:   200,
                    height: 140,
                    quality: 0.5
                }, function(err, stdout, stderr){
                    if (err) {console.log(err)}
                    //console.log('resized kittens.jpg to fit within 300px');
                });
                res.redirect('/my/addnews');
            }catch (err){
                oneNew = {
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    fulltext: req.body.fulltext,
                    active: publish=str2bool(req.body.active),
                    top: str2bool(req.body.top),
                    pubDate: new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000)+7200000),
                    ads: str2bool(req.body.ads)

                };
                daoNews.update(id, oneNew);
                console.log("уникальная новость без картинки // "+oneNew.title+' // отредактирована');
                res.redirect('/my/addnews');
            }
        }
    })});
router.post('/actives', function (req, res) {
    console.log("id новости для активации: ");
    console.log("id новости для активации: "+JSON.stringify(req.body));
    console.log("id новости для активации: "+req.body.id);
    daoNews.actives(req.body.id);
    res.end('ok')


});
function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}
function str2bool(strvalue){
    return (strvalue && typeof strvalue == 'string') ? (strvalue.toLowerCase() == 'true' || strvalue == '1') : (strvalue == true);
}
function sortByDate(one, two) {
    if (one.pubDate<two.pubDate) return 1;
    else return -1;

}
function sortDate(one, two) {
    if (one.time<two.time) return 1;
    else return -1;

}

module.exports = router;