var mongoose = require('mongoose');


var news = new mongoose.Schema({
    title : {
        type: String,
        //required: true
    },

    category : {
        type: String,
        //required: true
    },
    description : {
        type: String

    },

    pubDate : {
        type: Date

    },
    comments : {
        type: String

    },
    top : {
        type: Boolean


    },
    active : {
        type: Boolean


    },
    counter: {
        type: Number,
        default: 0
    },
    img:{
        type: String,
        default: ''
    },

    creator : {

        type: String,
        default: ''
    },
    views: {
        type: Number,
        default: 0
    },
    hit: {
        type: Number,
        default: 0
    },
    ads: {
        type: Boolean
    },

    fulltext:{
        type: String,
        default: ''
    }
})




module.exports = mongoose.model('news', news);
