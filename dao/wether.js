var config      = require('../config/config');
var mongoose = require('mongoose');
var Weth = require('../model/wether');
var SWeth = require('../model/citywether');
var FWeth = require('../model/tohourwether');
mongoose.connect(config.mongoose.uri, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB(daoSite)');
});
exports.create = function(Data){

    var wether=new Weth(Data);

    wether.save(function(err){
        if (err) {
            throw err
        }else{

        }
    })
};

exports.create2 = function(Data){
    var query = {'sity':Data.wether.city.name}

    //var wether=new Weth(Data);

    var update = { expire: new Date() },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document
    Weth.findOneAndUpdate(query, Data, options, function(error, result) {
        if (error) return;

        // do something with the document
    });
};
exports.create4 = function(Data){
    var query = {sity:Data.sity};
    Weth.findOne(query, function (err, w) {
        if (err){
            var wether=new Weth(Data);
            wether.save(Data);
        }
        if (w){
            Weth.updateOne(query, Data, function(error, result) {
                if (error) return;

                // do something with the document
            });
        };
        if (!w) {
            var wether=new Weth(Data);
            wether.save(Data);
        }
    })
};

exports.create5 = function(Data){
    var query = {sity:Data.sity};
    SWeth.findOne(query, function (err, w) {
        if (err){
            var wether=new SWeth(Data);
            wether.save(Data);
        }
        if (w){
            SWeth.updateOne(query, Data, function(error, result) {
                if (error) return;

                // do something with the document
            });
        };
        if (!w) {
            var wether=new SWeth(Data);
            wether.save(Data);
        }
    })
};
exports.createHour = function(Data){
    var query = {sity:Data.sity};
    FWeth.findOne(query, function (err, w) {
        if (err){
            var wether=new FWeth(Data);
            wether.save(Data);
        }
        if (w){
            FWeth.updateOne(query, Data, function(error, result) {
                if (error) return;

                // do something with the document
            });
        };
        if (!w) {
            var wether=new FWeth(Data);
            wether.save(Data);
        }
    })
};

exports.create3 = function(Data){
    var query = {'sity':Data.sity}

    var wether=new SWeth(Data);

    var update = { expire: new Date() },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document
    SWeth.findOneAndUpdate(query, Data, options, function(error, result) {
        if (error) return;

        // do something with the document
    });
};
exports.getAllHourCity=function () {
    return FWeth
        .find({}, function (err, news) {

        }).limit(50).then(function (news) {
            if (news){
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });

}
exports.getAllCity=function () {
    return SWeth
        .find({}, function (err, news) {

        }).limit(50).sort('sity').then(function (news) {
            if (news){
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });

}
exports.getCity=function (name) {
    return Weth
        .findOne({"sity": name}, function (news) {

        }).then(function (news) {
            if (news){
                //console.log('DAO погода переданы '+news);
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });

};
exports.getName=function (name) {
    return Weth
        .findOne({"sity": name}, function (err, sites) {

        }).then(function (sites) {
            if (sites){
                return sites
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
exports.getNameH=function (name) {
    return FWeth
        .findOne({"sity": name}, function (err, sites) {

        }).then(function (sites) {
            if (sites){
                return sites
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
exports.getallHourName=function (name) {
    return FWeth
        .findOne({"sity": name}, function (err, sites) {

        }).then(function (sites) {
            if (sites){
                return sites
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
