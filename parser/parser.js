const CronJob = require('cron').CronJob;
const fs = require('fs');
const request = require('request-promise');
const APPID='XXXXXXXXXXXXXXX';
const uri='http://api.openweathermap.org/data/2.5/forecast';
const units = "metric";
var mongoose = require('mongoose');
var daoW = require('../dao/wether');

let myJob = new CronJob('1 * * * *', function() {
    //console.log('running'+ new Date());
    getlist();
}, null, true);
myJob.start();
getlist();

function getlist(){
    fs.readFile('../data/file.txt', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj.length);
        for (var i = 0; i < obj.length; i++) {
            (function(i) {
                setTimeout(function() {
                    console.log(i);
                    console.log(obj[i].trname);
                    let sity = obj[i].name;
                    const options = {
                        method: 'GET',
                        uri: uri,
                        qs: {
                            q: sity,
                            units: units,
                            APPID: APPID
                        }
                    }

                    request(options)
                        .then(function (response) {
                            var w = JSON.parse(response);
                            w.city.runame=obj[i].trname;
                            let data=JSON.stringify(w);

                            shotWether(data);
                        })
                        .catch(function (err) {

                            console.log(err);
                        })



                }, 100 * i);
            })(i);
        }


    })};
function shotWether(data) {
    var shotBuf=[]
    var w = JSON.parse(data);
    //console.log(w.cod);
    let fhw={};
    fhw.sity=w.city.name.toLowerCase();
    fhw.wether=w;
    daoW.createHour(fhw);
    let ww={};
    ww.sity=w.city.name.toLowerCase();
    ww.wether=w;

    daoW.create4(ww);
    let hww={};
    hww.sity=w.city.name.toLowerCase();
    hww.ru=w.city.runame;
    hww.wether=w.list[0].main.temp;
    daoW.create5(hww);





}

