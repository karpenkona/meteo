const OpenWeatherMapHelper = require("openweathermap-node");

const helper = new OpenWeatherMapHelper(
    {
        APPID: '67036f3b41a9199141b3e6f5e4c4985a',
        units: "metric"
    }
);

helper.getCurrentWeatherByCityName("kiev", (err, currentWeather) => {
    if(err){
        console.log(err);
    }
    else{
        console.log(currentWeather);
    }
});