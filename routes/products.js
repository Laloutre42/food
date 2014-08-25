// Load the product model
var Product = require('../models/productModel');

// expose the routes to our app with module.exports
module.exports = function (app) {

    app.route('/products')

        .get(function (req, res, next) {
            console.log('Retrieving all products');
            Product.find(function(err, products) {
                res.send(products);
            });
        });

//app.get('/products/:id', wine.findById);
//app.post('/products', wine.addWine);
//app.put('/products/:id', wine.updateWine);
//app.delete('/products/:id', wine.deleteWine);

};


