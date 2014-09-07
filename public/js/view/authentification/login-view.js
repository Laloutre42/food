define(['backbone', 'resthub', 'hbs!template/authentification/login'],
    function (Backbone, Resthub, loginTemplate) {

        var LoginView = Resthub.View.extend({

            root: '#container',
            template: loginTemplate,

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
                this.validateForm();
                if (this.checkIfUserAlreadyLoggedIn()) return;
            },

            render: function () {
                LoginView.__super__.render.apply(this);
                return this;
            },

            close: function () {
                this.remove();
                this.unbind();
            },

            checkIfUserAlreadyLoggedIn: function () {
                // Check if the user is already login
                if (this.session.get("logged_in")) {
                    $('#messageLogin').text("You are already logged in. Please Log out first").removeClass('hide');
                    return true;
                }
                return false;
            },

            login: function () {
                $('#messageLogin').addClass('hide'); // Hide any errors on a new submit

                if (this.checkIfUserAlreadyLoggedIn()) return;

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
                        else {
                            $('#messageLogin').text(err.error).removeClass('hide');
                        }
                    }
                });

            },

            validateForm: function () {
                self = this;
                $('#loginForm').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        email: {
                            validators: {
                                notEmpty: {
                                    message: 'The email address is required and cannot be empty'
                                },
                                emailAddress: {
                                    message: 'The email address is not valid'
                                }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'The password is required and cannot be empty'
                                },
                                stringLength: {
                                    min: 6,
                                    message: 'The password must be more than 6 characters long'
                                }
                            }
                        }
                    }
                })
                    .on('success.form.bv', function (e) {
                        // Prevent form submission
                        e.preventDefault();

                        self.login();
                    });
            }

        });

        return LoginView;
    });
