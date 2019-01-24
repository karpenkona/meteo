var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text2', function (err) {
    if (err) throw err;
    console.log('Replaced!');
});

var fs = require('fs');
var array = fs.readFileSync('file.txt').toString().split("\n");
for(i in array) {
    console.log(array[i]);
}