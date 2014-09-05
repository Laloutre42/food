define(['backbone', 'resthub', 'hbs!template/authentification/login'],
    function (Backbone, Resthub, loginTemplate) {

        var LoginView = Resthub.View.extend({

            root: '#container',
            template: loginTemplate,
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
                LoginView.__super__.render.apply(this);
                return this;
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return LoginView;
    });
