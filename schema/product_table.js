var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    product_name: String,
    product_label: String
});

module.exports = mongoose.model('product', myschema);