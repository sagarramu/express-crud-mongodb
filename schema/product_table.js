var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    product_name: String,
    product_label: String,
    _category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
});

module.exports = mongoose.model('product', myschema);