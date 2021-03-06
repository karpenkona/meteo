const CronJob = require('cron').CronJob;
const fs = require('fs');
const request = require('request-promise');
const APPID='xxxxxxxxxxxxxxx';
const uri='http://api.openweathermap.org/data/2.5/forecast';
const units = "metric";
var mongoose = require('mongoose');
var daoW = require('../dao/wether');

let myJob = new CronJob('0 * * * *', function() {
    console.log('running a task every 1 hourc '+ new Date());
    getlist();
}, null, true, 'America/Los_Angeles');
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

                            fs.writeFile('../data/sity/'+obj[i].name+'.json', data, function (err) {
                                if (err) throw err;

                            });
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

    shotBuf = w.list.filter(function(item) {
        var hh = new Date(item.dt_txt);
        console.log(hh.getHours());
        let h=hh.getHours();
        return ((h == 0)|| (h == 6) || (h == 12) || (h == 18));
    });
    /*w.list.forEach(function(item, i, arr) {
        var hh = new Date(item.dt_txt);
        if ((hh.getHours()==0) || (hh.getHours()==9) || (hh.getHours()==15)|| (hh.getHours()==21)){
            console.log(hh.getHours());

        }
    });*/
    //console.log(w.list.length);
    //console.log(shotBuf.length);
    w.list=shotBuf.splice(0,13);
    //w.list=shotBuf;
    let ww={};
    ww.sity=w.city.name.toLowerCase();
    ww.wether=w;
    var query = {'sity':w.city.name}
    daoW.create2(ww);
    let hww={};
    hww.sity=w.city.name.toLowerCase();
    hww.ru=w.city.runame;
    hww.wether=w.list[0].main.temp;
    daoW.create3(hww);



// Find the document


    let data2=JSON.stringify(w);
    fs.writeFile('../data/sity/'+w.city.name+'.json', data2, function (err) {
        if (err) throw err;

    });



}

