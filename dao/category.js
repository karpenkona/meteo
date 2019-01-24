var config      = require('../config/config');
var mongoose = require('mongoose');
var Categorys = require('../model/category.js');

mongoose.connect(config.mongoose.uri, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB(daoCategory)');
});

exports.create = function(Data){

    return new Categorys(Data).save();
};
exports.getAllActive=function () {
    return Categorys
        .find({}, function (err, sites) {

        }).limit(100).sort( { "pubDate" : -1 } ).then(function (sites) {
            if (sites){
                return sites
            }
            else {
                return Promise.reject("Error wrong")
            }

        });


};
exports.getAll=function () {
    return Categorys
        .find({}, function (err, news) {

        }).limit(1000).then(function (news) {
            if (news){
                return news
            }
            else {
                return Promise.reject("Error wrong")
            }

        });

};