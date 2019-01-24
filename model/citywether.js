var mongoose = require('mongoose');
var swether = new mongoose.Schema({
    sity: {
        type: String
        //required: true
    },
    ru:{
        type: String
        //required: true
    },
    wether:{
        type: Object
    }
})
module.exports = mongoose.model('swether', swether);