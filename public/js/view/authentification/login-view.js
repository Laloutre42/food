define(['backbone', 'resthub', 'hbs!template/authentification/login'],
    function (Backbone, Resthub, loginTemplate) {

        var LoginView = Resthub.View.extend({

            root: '#container',
            template: loginTemplate,
            events: {
                "click #loginSubmit": "login"
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
                
                this.render();
            },

            render: function () {
                LoginView.__super__.render.apply(this);
                return this;
            },

            close: function () {
                this.remove();
                this.unbind();
            },

            login: function (event) {
                event.preventDefault(); // Don't let this button submit the form
                $('#messageLogin').addClass('hide'); // Hide any errors on a new submit

                this.session.login({
                    email: $('#loginEmail').val(),
                    password: $('#loginPassword').val()
                }, {
                    success: function (data) {

                        if (!data.info.success) {
                            $('#messageLogin').text(data.info.message).removeClass('hide');
                        }
                        else {
                            Backbone.history.navigate("/#", {trigger: true});
                        }
                    },
                    error: function (err) {
                        if (err.info && err.info.message) {
                            $('#messageLogin').text(err.info.message).removeClass('hide');
                        }
                        else{
                            $('#messageLogin').text(err.error).removeClass('hide');
                        }
                    }
                });

            }

        });

        return LoginView;
    });
