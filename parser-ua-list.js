//const listSity=require('./city.list.json')

var fs = require('fs');

const request = require('request-promise');

let id = '200'
let country ='UA'
const APPID='67036f3b41a9199141b3e6f5e4c4985a';
const units = "metric";
let uri='https://api.openweathermap.org/data/2.5/weather';
let uri2='http://api.openweathermap.org/data/2.5/forecast';
let lang='ua';


const options = {
    method: 'GET',
    uri: uri,
    qs: {
        q: 'Kiev'+'+country',
        units: units,
        APPID: APPID,
        lang: lang
    }
}

const options3 = {
    method: 'GET',
    uri: uri2,
    qs: {
        q: 'kiev',
        units: units,
        APPID: APPID
    }
}

var obj;
fs.readFile('file.txt', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj.length);


    console.log( obj.length );
    for (var i = 0; i < obj.length; i++) {
        (function(i) {
            setTimeout(function() {
                console.log(i);
                console.log(obj[i].trname);
                var sity = obj[i].name;
                const options3 = {
                    method: 'GET',
                    uri: uri2,
                    qs: {
                        q: sity,
                        units: units,
                        APPID: APPID
                    }
                }

                request(options3)
                    .then(function (response) {
                        // Запрос был успешным, используйте объект ответа как хотите
                        //console.log(response);
                        var w = JSON.parse(response);
                        console.log('Получено значений: '+w.list.length);
                        console.log(w);
                        console.log(w.list[1]);
                        fs.writeFile('sity/'+obj[i].name+'.json', response, function (err) {
                            if (err) throw err;
                            console.log('Replaced!');
                        });
                    })
                    .catch(function (err) {
                        // Произошло что-то плохое, обработка ошибки
                        console.log(err);
                    })



                }, 100 * i);
        })(i);
    }

});
