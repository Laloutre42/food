define(['backbone', 'resthub', 'hbs!template/authentification/profile', 'model/user'],
    function (Backbone, Resthub, profileTemplate, User) {

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

                // Session
                this.session = attributes.session;

                this.model = new User();
                this.model.fetch({
                    success: $.proxy(this.modelFetchedSuccess, this)
                });
            },

            modelFetchedSuccess: function(){
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
