// Load the product model
var util = require('../util/util');
var Product = require('../models/productModel');

// expose the routes to our app with module.exports
module.exports = function (app) {

    var productFields = 'url product_name energy_100g image_small_url';

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
    app.route('/products/:id')

        .get(function (req, res, next) {
            console.log('Retrieving products by id');
            Product.findById(req.params.id, function (err, product) {

                if (err)
                    return util.handleError(err, res);

                res.json(product);
            });
        });

    // Retrieve products by product_name
    app.route('/products/product_name/:product_name')

        .get(function (req, res, next) {
            console.log('Retrieving products by product_name');
            var regex = new RegExp(req.params.product_name, 'i');

            Product
                .count({product_name: regex})
                .where('energy_100g').gte(0)
                .where('image_small_url').ne("")
                .exec(function (err, count) {

                    if (err)
                        return util.handleError(err, res);

                    console.log(count + ' items found');

                    Product
                        .find({product_name: regex})
                        .where('energy_100g').gte(0)
                        .where('image_small_url').ne("")
                        .sort({'date': -1})
                        .limit(8)
                        .select(productFields)
                        .exec(function (err, products) {

                            if (err)
                                return util.handleError(err, res);

                            res.json({count: count, products: products});
                        });
                });


        });

};

//app.get('/products/:id', wine.findById);
//app.post('/products', wine.addWine);
//app.put('/products/:id', wine.updateWine);
//app.delete('/products/:id', wine.deleteWine);


