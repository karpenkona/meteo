var mongoose = require('mongoose');
var fullwether = new mongoose.Schema({
    sity: {
        type: String
        //required: true
    },
    wether:{
        type: Object
    }
})
module.exports = mongoose.model('fullwether', fullwether);