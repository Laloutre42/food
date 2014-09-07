define(['backbone', 'resthub', 'hbs!template/authentification/signUp'],
    function (Backbone, Resthub, signUpTemplate) {

        var SignUpView = Resthub.View.extend({

            root: '#container',
            template: signUpTemplate,

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
                SignUpView.__super__.render.apply(this);
                return this;
            },

            close: function () {
                this.remove();
                this.unbind();
            },

            checkIfUserAlreadyLoggedIn: function () {
                // Check if the user is already login
                if (this.session.get("logged_in")) {
                    $('#messageSignUp').text("You are already logged in. Please Log out first").removeClass('hide');
                    return true;
                }
                return false;
            },

            signUp: function (event) {

                $('#messageSignUp').addClass('hide'); // Hide any errors on a new submit

                if (this.checkIfUserAlreadyLoggedIn()) return;

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
                        else {
                            $('#messageSignUp').text(err.error).removeClass('hide');
                        }
                    }
                });

            },

            validateForm: function () {
                self = this;
                $('#signUpForm').bootstrapValidator({
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

                        self.signUp();
                    });
            }

        });

        return SignUpView;
    });
