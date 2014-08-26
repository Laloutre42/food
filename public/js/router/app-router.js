define(['backbone', 'bootstrap', 'view/searchFood-view', 'view/items-view', 'collection/items'],
    function (Backbone, Bootstrap, SearchFoodView, ItemsView, Items) {

        var AppRouter = Backbone.Router.extend({

            initialize: function () {

                // Start Backbone history
                Backbone.history.start({ pushState: true, root: "/" });
            },

            routes: {
                '': 'home2'
            },

            home: function () {

                // This general object is used for event aggregator between views
                this.vent = _.extend({}, Backbone.Events);

                new SearchFoodView({ root: $('#searchFoodContainer'), vent: this.vent});

            },

            home2: function () {

                // This general object is used for event aggregator between views
                this.vent = _.extend({}, Backbone.Events);

                new ItemsView({ collection: new Items()});

            }

        });

        return AppRouter;

    });