var im = require('imagemagick');


im.identify(['-format', '%wx%h', '1.jpg'], function(err, output){
    if (err) throw err;
    console.log('dimension: '+output);
    // dimension: 3904x2622
});
im.resize({
    srcPath: '1.jpg',
    dstPath: '300/1.jpg',
    width:   300,
    quality: 0.5
}, function(err, stdout, stderr){
    if (err) throw err;
    console.log('resized kittens.jpg to fit within 256x256px');
});