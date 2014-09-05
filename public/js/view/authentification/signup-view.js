define(['backbone', 'resthub', 'hbs!template/authentification/signUp'],
    function (Backbone, Resthub, signUpTemplate) {

        var SignUpView = Resthub.View.extend({

            root: '#container',
            template: signUpTemplate,
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
                SignUpView.__super__.render.apply(this);
                return this;
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return SignUpView;
    });
