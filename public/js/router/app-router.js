define(['backbone', 'bootstrap', 'view/searchFood-view', 'view/item-view'],
    function (Backbone, Bootstrap, SearchFoodView, ItemView) {

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

                new ItemView({ root: $('#searchFoodContainer'), vent: this.vent});

            }

        });

        return AppRouter;

    });