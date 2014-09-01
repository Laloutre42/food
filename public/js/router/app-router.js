define(['backbone', 'bootstrap', 'view/items-view', 'collection/items', 'collection/products'],
    function (Backbone, Bootstrap, ItemsView, Items, Products) {

        var AppRouter = Backbone.Router.extend({

            initialize: function () {

                // Start Backbone history
                Backbone.history.start({ pushState: true, root: "/" });
            },

            routes: {
                '': 'home'
            },

            home: function () {

                // This general object is used for event aggregator between views
                this.vent = _.extend({}, Backbone.Events);

                new ItemsView({ collection: new Items()});

            }

        });

        return AppRouter;

    });