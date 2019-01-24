var config      = require('../config/config');
var mongoose = require('mongoose');
var News = require('../model/news.js');

mongoose.connect(config.mongoose.uri, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB(daoSite)');
});

exports.create = function(Data){

    var news=new News(Data);

    news.save(function(err){
        if (err) {
            throw err
        }else{

        }
    })
};
exports.update = function(id, Data){

    News.findByIdAndUpdate(id, Data,
        function(err, upd) {
            if (err) throw err;

            console.log('Успешно изменили '+upd);
        });
};


exports.getAll=function () {
    return News
        .find({}, function (err, news) {

        }).limit(1000).sort( { "pubDate" : -1 } ).then(function (news) {
            if (news){
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });

}
exports.getlastN=function (n) {
    return News
        .find({}, function (err, news) {

        }).limit(n).sort( { "pubDate" : -1 } ).then(function (news) {
            if (news){
                console.log('DAO новости переданы '+news);
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });

};
exports.getAllActive=function () {
    return News
        .find({active:true}, function (err, sites) {

        }).limit(100).sort( { "pubDate" : -1 } ).then(function (sites) {
            if (sites){
                return sites
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
exports.getActiveN=function (n) {
    return News
        .find({active:true}, function (err, sites) {

        }).limit(n).sort( { "pubDate" : -1 } ).then(function (sites) {
            if (sites){
                return sites
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
exports.getTopActiveN=function (n) {
    return News
        .find({active:true, top: true}, function (err, sites) {

        }).limit(n).sort( { "pubDate" : -1 } ).then(function (sites) {
            if (sites){
                return sites
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
exports.getBySiteId=function (id) {
    return News
        .find({site:id}, function (err, news) {

        }).limit(200).sort( { "pubDate" : -1 } ).then(function (news) {
            if (news){
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
exports.findAllUsers=function (siteId) {
    return News
        .find({
            'site': { $in: siteId }
        }, function (err, news) {

        }).limit(100).sort( { "pubDate" : -1 } ).then(function (news) {
            if (news){
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });

};
exports.findLast=function (siteid) {
    return News
        .findOne({'site':siteid}, {}, { sort: { 'pubDate' : -1 } }, function(err, lastnew) {
            if (lastnew) console.log('последняя  '+lastnew.title);
        }).then(function (lastnew) {
            if (lastnew){
                return lastnew
            }
            else {
                return Promise.reject("Error wrong")
            }

        })
        ;

}
exports.findLastNews=function (siteid) {
    return News.findOne({'site':siteid}, {}, { sort: { 'pubDate' : -1 } } ).then(function (item) {
        if (item){
            return item
        }
        else {
            return Promise.reject("Error wrong")
        }

    })

}
exports.findLastSiteId=function (siteid) {
    return News.findOne({'site':siteid, 'creator':'rss'},{}, { sort: { 'pubDate' : -1 } }, function (err, news) {

    }).then(function (news) {
        if (news){
            console.log('последняя  '+news);
            return news
        }
        else {
            return Promise.reject("Error wrong")
        }

    }, function (reason) {
        return Promise.reject("Error wrong")
    })

}
exports.actives = function(Data){
    var query = {'_id':Data};
    News.findOne(query, function (err, news) {

    }).then(function (news) {
        if (news.active){
            News.findOneAndUpdate(query, {active:false}, function(err, doc){
                if (err) console.log("ошибка + "+err);

            });
        }
        else {
            News.findOneAndUpdate(query, {active:true}, function(err, doc){
                if (err) console.log("ошибка + "+err);

            });
        }

    });



};
exports.counter=function(Data){
    var query = {'_id':Data};
    News.findOneAndUpdate(query, { $inc : { counter: 1 } }, function(err, doc){
        if (err) console.log("ошибка + "+err);

    });



};
exports.findNewsById=function (id) {
    return News.findById(id, function(error, doc) {

    }).then(function (news) {
        if (news){
            return news
        }
        else {
            return Promise.reject("Error wrong")
        }

    }, function (reason) {
        return Promise.reject("Error wrong")
    })

};
exports.findDateInterval=function (d1, d2) {
    return News.find( { 'pubDate': { $gte: d1, $lte: d2+86400000 } } ).then(function (news) {
        if (news){
            return news
        }
        else {
            return Promise.reject("Error wrong")
        }


    })


}



