var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var fs = require('fs');
var wetherAPI = require('../config/wethers.json');

const request = require('request-promise');
var express = require('express');



var  daoCategory=require('../dao/category');
var daoNews = require('../dao/news');
var daoWether = require('../dao/wether');
const config = require('../config/config');
//var path = require('path');
var multer  = require('multer');
//var im = require('imagemagick');
var ObjectId = require('mongoose').Types.ObjectId;
var wapi=JSON.stringify(wetherAPI);





router.get('/old', (req, res)=>{
    daoNews.getActiveN(20).then(function (data) {
        daoNews.getTopActiveN(10).then(function (top){
            daoWether.getAllCity().then(function (sweth) {
                console.log(sweth)
                res.render('main', {news: data, top: top, sweth:sweth})
            })
                //res.render('main', {news: data, top: top})


        })

    }, function () {
        res.send('error')
    })

});
router.get('/', (req, res)=>{
    var id=req.params.id;
    daoNews.getActiveN(7).then(function (data) {
        daoNews.getTopActiveN(3).then(function (top){
            daoWether.getAllCity().then(function (weth){
                res.render('main', {news: data, top: top, wapi:wapi, sweth:weth})

            })


        })

    }, function () {
        res.send('error')
    })

});
router.get('/test/:id', (req, res)=>{
    var id=req.params.id;
    daoNews.getActiveN(20).then(function (data) {
        daoNews.getTopActiveN(10).then(function (top){
            daoWether.getName(id).then(function (weth){
                res.render('main4', {news: data, top: top, wapi:wapi, weth:weth})
            })


        })

    }, function () {
        res.send('error')
    })

});

router.get('/pogoda1/:id', (req, res)=>{
    var id=req.params.id;
    daoNews.getActiveN(20).then(function (data) {
        daoNews.getTopActiveN(3).then(function (top){
            daoWether.getName(id).then(function (weth){
                daoWether.getAllCity().then(function (sweth) {
                    res.render('main4', {news: data, top: top, wapi:wapi, weth:weth, sweth:sweth})
                })

            })


        })

    }, function () {
        res.send('error')
    })

});

router.get('/pogoda/:id', (req, res)=>{
    var id=req.params.id;
    daoNews.getActiveN(7).then(function (data) {
        daoNews.getTopActiveN(3).then(function (top){
            daoWether.getName(id).then(function (weth){
                daoWether.getAllCity().then(function (sweth) {
                    res.render('city', {news: data, top: top, wapi:wapi, weth:weth, sweth:sweth})
                })

            })


        })

    }, function () {
        res.send('error')
    })

});
router.get('/prognoz2/:id', (req, res)=>{
    var id=req.params.id;
    daoNews.getActiveN(20).then(function (data) {
        daoNews.getTopActiveN(10).then(function (top){
            daoWether.getName(id).then(function (weth){
                daoWether.getAllCity().then(function (sweth) {
                    res.render('city2', {news: data, top: top, wapi:wapi, weth:weth, sweth:sweth})
                })

            })


        })

    }, function () {
        res.send('error')
    })

});



router.get('/news', (req, res)=>{
    daoNews.getActiveN(20).then(function (data) {
        daoNews.getTopActiveN(3).then(function (top){
            daoWether.getAllCity().then(function (weth){
                res.render('news', {news: data, top: top, sweth:weth})

            })
            //res.render('news', {news: data, top: top})
        })

    }, function () {
        res.send('error')
    })

});
router.get('/rss', (req, res)=>{
    daoNews.getActiveN(20).then(function (data) {
        res.render('rss', {news: data})

    }, function () {
        res.send('error')
    })

});
router.get('/news/:id', (req, res)=>{
    var id=req.params.id;
    //console.log('id новости: '+ id);
    daoNews.findNewsById(id).then(function (result) {
        daoNews.getActiveN(20).then(function (data) {
            daoNews.getTopActiveN(3).then(function (top){
                daoWether.getAllCity().then(function (weth){
                    res.render('onenews', {one: result, news: data, top: top, sweth:weth})

                })
                //res.render('onenews', {one: result, news: data, top: top})
            })

        }, function () {
            res.send('error')
        })



    })


});
router.get('/news/:id/amp', (req, res)=>{
    var id=req.params.id;
    console.log('id новости: '+ id);
    daoNews.findNewsById(id).then(function (result) {
        daoNews.getActiveN(20).then(function (data) {
            daoNews.getTopActiveN(3).then(function (top){
                res.render('amp', {one: result, news: data, top: top})
            })

        }, function () {
            res.send('error')
        })



    })


});
router.get('/go/news/:id', (req, res)=>{
    var id=req.params.id;
    //console.log('id новости: '+ id);
    daoNews.findNewsById(id).then(function (result) {
        daoNews.getActiveN(20).then(function (data) {
            daoNews.getTopActiveN(3).then(function (top){
                daoWether.getAllCity().then(function (weth){
                    res.render('goonenews', {one: result, news: data, top: top, sweth:weth})

                })
                //res.render('goonenews', {one: result, news: data, top: top})
            })

        }, function () {
            res.send('error')
        })



    })


});

module.exports = router;