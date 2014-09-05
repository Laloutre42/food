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

                $.ajax({
                    url: '/login',
                    type: 'POST',
                    dataType: "json",
                    data: {
                        email: $('#loginEmail').val(),
                        password: $('#loginPassword').val()
                    },
                    success: function (data) {

                        if (!data.success) {
                            $('#messageLogin').text(data.message).removeClass('hide');
                        }
                        else {
                            Backbone.history.navigate("/#", {trigger: true});
                        }
                    }
                });

            }

        });

        return LoginView;
    });
