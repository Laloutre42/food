// The Item model

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var itemSchema = new Schema({
    "name": String,
    "category": String,
    "energy_100g": Number,
    "weight": Number,
    "energy": Number,
    "openFoodFactProduct": Boolean,
    "url": String
});

module.exports = mongoose.model('Item', itemSchema);