define(['backbone', 'resthub', 'hbs!template/authentification/signUp'],
    function (Backbone, Resthub, signUpTemplate) {

        var SignUpView = Resthub.View.extend({

            root: '#container',
            template: signUpTemplate,
            events: {
                "click #signUpSubmit": "signUp"
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

            render: function() {
                SignUpView.__super__.render.apply(this);
                return this;
            },

            close: function() {
                this.remove();
                this.unbind();
            },

            signUp: function (event) {
                event.preventDefault(); // Don't let this button submit the form
                $('#messageSignUp').addClass('hide'); // Hide any errors on a new submit

                this.session.signUp({
                    email: $('#signUpEmail').val(),
                    password: $('#signUpPassword').val()
                }, {
                    success: function (data) {

                        if (!data.info.success) {
                            $('#messageSignUp').text(data.info.message).removeClass('hide');
                        }
                        else {
                            Backbone.history.navigate("/#", {trigger: true});
                        }
                    },
                    error: function (err) {
                        if (err.info && err.info.message) {
                            $('#messageSignUp').text(err.info.message).removeClass('hide');
                        }
                        else{
                            $('#messageSignUp').text(err.error).removeClass('hide');
                        }
                    }
                });

            }

        });

        return SignUpView;
    });
