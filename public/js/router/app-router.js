define(['backbone', 'bootstrap', 'view/searchFood-view'],
    function (Backbone, Bootstrap, SearchFoodView) {

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

                new SearchFoodView({ root: $('#searchFoodContainer'), vent: this.vent});

            }

        });

        return AppRouter;

    });