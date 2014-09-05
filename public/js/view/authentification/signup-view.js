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

                $.ajax({
                    url: '/signUp',
                    type: 'POST',
                    dataType: "json",
                    data: {
                        email: $('#signUpEmail').val(),
                        password: $('#signUpPassword').val()
                    },
                    success: function (data) {

                        if (!data.success) {
                            $('#messageSignUp').text(data.message).removeClass('hide');
                        }
                        else { // If not, send them back to the home page
                            Backbone.history.navigate("/#", {trigger: true});
                        }
                    }
                });

            }

        });

        return SignUpView;
    });
