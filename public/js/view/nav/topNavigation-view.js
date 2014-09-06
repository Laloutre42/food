define(['backbone', 'resthub', 'hbs!template/nav/topNavigation'],
    function (Backbone, Resthub, topNavigationTemplate) {

        var TopNavigationView = Resthub.View.extend({

            root: '#topNavigationBar',

            template: topNavigationTemplate,
            events: {
                "click .logout": "logout"
            },

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;

                this.session = attributes.session;

                // Listen for session logged_in state changes and re-render
                this.session.on("change:logged_in", $.proxy(this.onLoginStatusChange, this));

                this.render();
            },

            render: function () {
                TopNavigationView.__super__.render.apply(this);
                console.log(this.session.toJSON());

                if (this.session.get("logged_in")) {
                    console.log('login');
                    $('.navbar-right').html(
                            '<a href="/#profile" class="btn btn-success">My profile</a>' +
                            ' <a href="/#logout" class="btn btn-default logout">Log out</a>'
                    );
                }
                else {
                    console.log('nolog');
                    $('.navbar-right').html(
                            '<a href="/#login" class="btn btn-default">Local Login</a>' +
                            '<a href="/#signUp" class="btn btn-default">Local Signup</a>'
                    );
                }
                return this;
            },

            onLoginStatusChange: function (evt) {
                this.render();
            },

            logout: function (event) {
                event.preventDefault();

                this.session.logout({
                    success: function (data) {

                        if (data.success) {
                            Backbone.history.navigate("/#logout", {trigger: true});
                        }
                    }
                });
            }

        });

        return TopNavigationView;
    });
