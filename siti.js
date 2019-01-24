//const listSity=require('./city.list.json')

var fs = require('fs');
var obj;
fs.readFile('city.list.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj.length);
    var rulist=[];
    rulist = obj.filter(function(number) {
        return number.country == 'UA';
    });

    console.log( rulist.length );
    fs.writeFile('ua-onli.json', JSON.stringify(rulist, null, 2) , 'utf-8');
});
//var  siti=JSON.parse(listSity)
console.log(obj);