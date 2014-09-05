define(['backbone', 'resthub', 'hbs!template/nav/topNavigation'],
    function (Backbone, Resthub, topNavigationTemplate) {

        var TopNavigationView = Resthub.View.extend({

            root: '#topNavigationBar',

            template: topNavigationTemplate,
            events: {

            },

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;

                this.render();
            },

            render: function() {
                TopNavigationView.__super__.render.apply(this);
                return this;
            }

        });

        return TopNavigationView;
    });
