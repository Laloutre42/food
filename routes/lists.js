// Load the list model
var util = require('../util/util');
var List = require('../models/listModel');

// expose the routes to our app with module.exports
module.exports = function (app) {

    app.route('/lists')

        // Retrieve all lists
        .get(function (req, res, next) {

            console.log('Retrieving all lists');

            List.find(function (err, lists) {

                if (err)
                    return util.handleError(err, res);

                res.json(lists);
            });
        })

        // Create a list
        .post(function (req, res) {

            console.log('Save a new list');

            var list = new List({
                name: req.body.name,
                author: req.body.author
            });

            // Save list
            list.save(function (err) {

                if (err)
                    return util.handleError(err, res);

                res.json(list);
            });


        });


    app.route('/lists/:id')

        // Retrieve lists by id
        .get(function (req, res, next) {

            console.log('Retrieving lists by id');

            List.findById(req.params.id, function (err, list) {

                if (err)
                    return util.handleError(err, res);

                res.json(list);
            });
        })

        // Update an list with this id
        .put(function (req, res) {

            console.log('Updating list by id');

            var list = new List({
                name: req.body.name,
                author: req.body.author
            });

            // Update list

            // Convert the Model instance to a simple object using Model's 'toObject' function
            // to prevent weirdness like infinite looping...
            var listUpdated = list.toObject();

            // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
            delete listUpdated._id;

            List.findByIdAndUpdate(req.params.id, { $set: listUpdated }, function (err, list) {

                if (err)
                    return util.handleError(err, res);

                res.json(list);
            });

        })

        // Delete an list with this id
        .delete(function (req, res) {

            console.log('Deleting list by id');

            List.remove({_id: req.params.id}, function (err, list) {

                if (err)
                    return util.handleError(err, res);

                res.json({ message: 'Successfully deleted' });
            });
        });


};


