
const request = require("request");
let cityName = 'Kiev';
const APPID='67036f3b41a9199141b3e6f5e4c4985a';
const units = "metric";
let uri='api.openweathermap.org/data/2.5/forecast';
let test = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=67036f3b41a9199141b3e6f5e4c4985a';
let country ='UA';

request.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&units=${units}&APPID=${APPID}`,
    (err, data)=>{
        if  (err){
            console.log(err);
        }
        if (!err)   {
            console.log(data.body);
        }
    });
