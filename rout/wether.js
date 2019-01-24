var code = require('../data/ouafileOBJ.json');
var maxmind = require('maxmind');
const request = require('request-promise');
const APPID='67036f3b41a9199141b3e6f5e4c4985a';
const uri='http://api.openweathermap.org/data/2.5/forecast';
const uricode='http://api.openweathermap.org/data/2.5/weather';
const units = "metric";
var cityLookup = maxmind.openSync('./rout/GeoLite2-City.mmdb');


// ---------
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var fs = require('fs');
var wetherAPI = require('../config/wethers.json');

var  daoCategory=require('../dao/category');
var daoNews = require('../dao/news');
var daoWether = require('../dao/wether');
const config = require('../config/config');
//var path = require('path');
var multer  = require('multer');
//var im = require('imagemagick');
var ObjectId = require('mongoose').Types.ObjectId;
var wapi=JSON.stringify(wetherAPI);
// ---------------
router.get('/', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //var ip ='176.97.1.69';
    if (maxmind.validate(ip)){


    }
    else {
        ip ='176.97.1.69';
    }
    try {
        var location = cityLookup.get(ip);
        //console.log(ip+' - loxation: '+location);
        var sity = location.city.geoname_id;
    }  catch (err){
        var sity = '703448'
    }


    //console.log(ip+'Sity ID: '+sity);
    const options = {
        method: 'GET',
        uri: uri,
        qs: {
            id: sity,
            units: units,
            APPID: APPID
        }
    }
    request(options)
        .then(function (response) {
            var w = JSON.parse(response);
            //w.city.runame=obj[i].trname;
            var weth=JSON.stringify(w);
            //res.send(location)
            //res.send(data)
            //res.render('wether', {weth: data, wapi:wapi})
            //----
            //var id=req.params.id;
            daoNews.getActiveN(7).then(function (data) {
                daoNews.getTopActiveN(3).then(function (top){
                    daoWether.getAllCity().then(function (sweth) {
                        var uaname=findUAname(sity)
                        res.render('wether', {news: data, top: top, wapi:wapi, uaname:uaname, dweth:weth, sweth:sweth})
                    })


                })

            }, function () {
                //res.redirect('/')
                res.send('error')
            })
            //---

        })
        .catch(function (err) {

            console.log(err);
            res.send('error')
        })

});


router.get('/old', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //var ip ='176.97.1.69';
    if (maxmind.validate(ip)){
        var location = cityLookup.get(ip);
        console.log(ip+' - loxation: '+location);
        var sity = location.city.geoname_id;
        //console.log(ip+'Sity ID: '+sity);
        const options = {
            method: 'GET',
            uri: uri,
            qs: {
                id: sity,
                units: units,
                APPID: APPID
            }
        }
        request(options)
            .then(function (response) {
                var w = JSON.parse(response);
                //w.city.runame=obj[i].trname;
                var weth=JSON.stringify(w);
                //res.send(location)
                //res.send(data)
                //res.render('wether', {weth: data, wapi:wapi})
                //----
                //var id=req.params.id;
                daoNews.getActiveN(7).then(function (data) {
                    daoNews.getTopActiveN(3).then(function (top){
                        daoWether.getAllCity().then(function (sweth) {
                            var uaname=findUAname(sity)
                            res.render('wether', {news: data, top: top, wapi:wapi, uaname:uaname, dweth:weth, sweth:sweth})
                        })


                    })

                }, function () {
                    //res.redirect('/')
                    res.send('error')
                })
                //---

            })
            .catch(function (err) {

                console.log(err);
                res.send('error')
            })

    }
    else {
        res.send('не получили ваш IP')
    }

});





//findUAname('556149')

function findUAname(id) {
    if (id in code){
        //console.log(code[id].uaname)
        return code[id].onlytrue
    }
    else {
        return ''
    }
}

module.exports = router;