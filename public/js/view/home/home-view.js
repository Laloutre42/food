define(['backbone', 'resthub', 'hbs!template/home/home'],
    function (Backbone, Resthub, homeTemplate) {

        var HomeView = Resthub.View.extend({

            root: '#container',
            template: homeTemplate,
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

                if (attributes.message){
                    $(".alert .alertContent").text(attributes.message);
                    $(".alert").show();
                }
            },

            render: function() {
                HomeView.__super__.render.apply(this);
                return this;
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return HomeView;
    });
