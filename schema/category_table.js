var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    category_name: String,
    category_label: String
});

module.exports = mongoose.model('category', myschema);