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
            var page = req.query.page;
            var perPage = req.query.per_page;

            Product
                .count({product_name: regex})
                .where('energy_100g').gte(0)
                .where('image_small_url').ne("")
                .exec(function (err, count) {

                    if (err)
                        return util.handleError(err, res);

                    console.log(count + ' items found');
                    var truncate = false;
                    if (count > 64){
                        truncate = true;
                        count = 64;
                    }

                    Product
                        .find({product_name: regex})
                        .where('energy_100g').gte(0)
                        .where('image_small_url').ne("")
                        .sort({'date': -1})
                        .skip(perPage * (page - 1))
                        .limit(perPage)
                        .select(productFields)
                        .exec(function (err, products) {

                            if (err)
                                return util.handleError(err, res);

                            res.json({count: count, truncate: truncate, products: products});
                        });
                });


        });

};


