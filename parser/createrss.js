var builder = require('xmlbuilder');
var fs = require('fs');
var daoNews = require('../dao/news');
var CronJob = require('cron').CronJob;

var myJob = new CronJob('*/10 * * * *', function() {
    //console.log('running a task every 5 sec '+ new Date());
    makeRss();
}, null, true, 'America/Los_Angeles');
myJob.start();
makeRss();
function makeRss(){

    daoNews.getActiveN(5).then(function (data) {
        //console.log(data[0].title)
        var xml = builder.create('rss',{ encoding: 'utf-8'})
            .att('version', '2.0')
            .ele('channel')
            .ele('title', 'https://meteohub.pro/').up()
            .ele('link', 'https://meteohub.pro/').up()
            .ele('language', 'ru').up()
        data.forEach(function (i, elem)
        {
            //console.log(i.title)
            var item = xml.ele('item')
                .ele('title', i.title).up()
                .ele('guid', 'https://meteohub.pro/news/'+i._id).up()
                .ele('link', 'https://meteohub.pro/news/'+i._id).up()
                .ele('description', i.description).up()
                .ele('pubDate', new Date(i.pubDate).toISOString()).up()
                .ele('category', i.category).up()
                .ele('fulltext', i.fulltext).up()
                .ele('enclosure')
                .att('leength',"8989")
                .att('url', 'https://meteohub.pro/article/img/'+i.img)
                .att('leength',"8989").up();

        })

        //console.log(xml.end({ pretty: true }));
        //xml.end({ pretty: true })
        fs.writeFile('../static/rss/feed.xml', xml.end({ pretty: true }), function (err) {
            if (err) throw err;
            //console.log('Replaced!');
        });
    }, function () {
        console.log('error')
    })

}
/*
    //.end({ pretty: true});
daoNews.getActiveN(5).then(function (data) {
    console.log(data[0].title)
    var xml = builder.create('rss',{ encoding: 'utf-8'})
        .att('version', '2.0')
        .ele('channel')
        .ele('title', 'https://mpulse.top/').up()
        .ele('link', 'https://mpulse.top/').up()
        .ele('language', 'ru').up()
    data.forEach(function (i, elem)
        {
            console.log(i.title)
            var item = xml.ele('item')
                .ele('title', i.title).up()
                .ele('guid', 'https://mpulse.top/news/'+i._id).up()
                .ele('link', 'https://mpulse.top/news/'+i._id).up()
                .ele('description', i.description).up()
                .ele('pubDate', new Date(i.pubDate).toISOString()).up()
                .ele('category', i.category).up()
                .ele('fulltext', i.fulltext).up()
                .ele('enclosure')
                .att('leength',"8989")
                .att('url', 'https://mpulse.top/article/img/'+i.img)
                .att('leength',"8989").up();

        })

    //console.log(xml.end({ pretty: true }));
    //xml.end({ pretty: true })
    fs.writeFile('../static/rss/feed.xml', xml.end({ pretty: true }), function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
}, function () {
    console.log('error')
})

*/


