var mongoose = require('mongoose');
var cat = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },

    parent: {
        type: String,
        //required: true
    },
    description: {
        type: String

    }
});
module.exports = mongoose.model('Cats', cat);