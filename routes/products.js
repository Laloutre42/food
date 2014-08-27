// Load the product model
var util = require('../util/util');
var Product = require('../models/productModel');

// expose the routes to our app with module.exports
module.exports = function (app) {

    var productFields = 'url product_name energy_100g';

    // Retrieve all products
    app.route('/products')

        .get(function (req, res, next) {
            console.log('Retrieving all products');
            Product.find(function (err, products) {

                if (err)
                    return util.handleError(err, res);

                res.json(products);
            });
        });

    // Retrieve products by id
    app.route('/products/id/:id')

        .get(function (req, res, next) {
            console.log('Retrieving products by id');
            Product.findById(req.params.id, function (err, product) {

                if (err)
                    return util.handleError(err, res);

                res.json(product);
            });
        });

    // Retrieve products by product_name. use LIKE
    app.route('/products/product_name/like/:product_name')

        .get(function (req, res, next) {
            console.log('Retrieving products by product_name LIKE');
            var regex = new RegExp(req.params.product_name, 'i');
            Product.find({product_name: regex, energy_100g: { $gte: 0 }}, productFields, function (err, product) {

                if (err)
                    return util.handleError(err, res);

                res.json(product);
            });
        });

    // Retrieve products by product_name. use strict EQUALS
    app.route('/products/product_name/equals/:product_name')

        .get(function (req, res, next) {
            console.log('Retrieving products by product_name EQUALS');
            Product.find({product_name: req.params.product_name}, productFields, function (err, product) {

                if (err)
                    return util.handleError(err, res);

                res.json(product);
            });
        });

};

//app.get('/products/:id', wine.findById);
//app.post('/products', wine.addWine);
//app.put('/products/:id', wine.updateWine);
//app.delete('/products/:id', wine.deleteWine);


