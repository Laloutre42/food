// Load the item model
var util = require('../util/util');
var Item = require('../models/itemModel');
var Product = require('../models/productModel');

// expose the routes to our app with module.exports
module.exports = function (app) {

    app.route('/items')

        // Retrieve all items
        .get(function (req, res, next) {

            console.log('Retrieving all items');

            Item.find(function (err, items) {

                if (err)
                    return util.handleError(err, res);

                res.json(items);
            });
        })

        // Create a item
        .post(function (req, res) {

            console.log('Save a new item');

            var item = new Item({
                name: req.body.name,
                category: req.body.category,
                energy_100g: req.body.energy_100g,
                weight: req.body.weight,
                energy: req.body.energy_100g * req.body.weight / 100
            });

            // Check if item name belongs to OpenFoodFact DB
            Product.find({product_name: req.body.name}, function (err, product) {

                if (err) {
                    return util.handleError(err, res);
                }
                else {
                    // Product belongs to OpenFoodFact DB or not
                    if (product != '' && product[0] != '' && product[0].energy_100g != '' &&
                        ((Math.ceil(product[0].energy_100g / 4.184) == item.energy_100g))) {

                        item.openFoodFactProduct = true;
                        item.url = product[0].url;
                    }
                    else {
                        item.openFoodFactProduct = false;
                    }

                    // Save item
                    item.save(function (err) {

                        if (err)
                            return util.handleError(err, res);

                        res.json(item);
                    });
                }
            });
        });


    app.route('/items/:id')

        // Retrieve items by id
        .get(function (req, res, next) {

            console.log('Retrieving items by id');

            Item.findById(req.params.id, function (err, item) {

                if (err)
                    return util.handleError(err, res);

                res.json(item);
            });
        })

        // Update an item with this id
        .put(function (req, res) {

            console.log('Updating item by id');

            var item = new Item({
                name: req.body.name,
                category: req.body.category,
                energy_100g: req.body.energy_100g,
                weight: req.body.weight,
                energy: req.body.energy_100g * req.body.weight / 100
            });

            // Check if item name belongs to OpenFoodFact DB
            Product.find({product_name: req.body.name}, function (err, product) {

                if (err) {
                    return util.handleError(err, res);
                }
                else {

                    // Product belongs to OpenFoodFact DB or not
                    if (product != '' && product[0] != '' && product[0].energy_100g != '' &&
                        ((Math.ceil(product[0].energy_100g / 4.184) == item.energy_100g))) {

                        item.openFoodFactProduct = true;
                        item.url = product[0].url;
                    }
                    else {
                        item.openFoodFactProduct = false;
                    }

                    // Update item

                    // Convert the Model instance to a simple object using Model's 'toObject' function
                    // to prevent weirdness like infinite looping...
                    var itemUpdated = item.toObject();

                    // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
                    delete itemUpdated._id;

                    Item.findByIdAndUpdate(req.params.id, { $set: itemUpdated }, function (err, item) {


                        if (err)
                            return util.handleError(err, res);

                        res.json(item);
                    });
                }
            });

        })

        // Delete an item with this id
        .delete(function (req, res) {

            console.log('Deleting item by id');

            Item.remove({_id: req.params.id}, function (err, item) {

                if (err)
                    return util.handleError(err, res);

                res.json({ message: 'Successfully deleted' });
            });
        });


};

//app.get('/items/:id', wine.findById);
//app.post('/items', wine.addWine);
//app.put('/items/:id', wine.updateWine);
//app.delete('/items/:id', wine.deleteWine);


