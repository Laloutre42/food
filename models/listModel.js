// The Item model

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var listSchema = new Schema({
    name: String,
    author: String,
    description: String
});

module.exports = mongoose.model('List', listSchema);