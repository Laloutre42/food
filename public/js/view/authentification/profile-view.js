define(['backbone', 'resthub', 'hbs!template/authentification/profile'],
    function (Backbone, Resthub, profileTemplate) {

        var ProfileView = Resthub.View.extend({

            root: '#container',
            template: profileTemplate,
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
                ProfileView.__super__.render.apply(this);
                return this;
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return ProfileView;
    });
