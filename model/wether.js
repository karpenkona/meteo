var mongoose = require('mongoose');
var wether = new mongoose.Schema({
    sity: {
        type: String
        //required: true
    },
    wether:{
        type: Object
    }
})
module.exports = mongoose.model('wether', wether);