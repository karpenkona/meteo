const request = require('request-promise');
let sity = 'Kiev';
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
        q: sity+','+country,
        units: units,
        APPID: APPID,
        lang: lang
    }
}

const options2 = {
    method: 'GET',
    uri: uri2,
    qs: {
        q: sity,
        units: units,
        APPID: APPID
    }
}

request(options2)
    .then(function (response) {
        // Запрос был успешным, используйте объект ответа как хотите
        //console.log(response);
        var w = JSON.parse(response);
        console.log('Получено значений: '+w.list.length);
        console.log(w);
        console.log(w.list[1]);
    })
    .catch(function (err) {
        // Произошло что-то плохое, обработка ошибки
        console.log(err);
    })
//console.log(siti[0]);