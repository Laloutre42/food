define(['backbone', "model/user"],
    function (Backbone, User) {

        var SessionModel = Backbone.Model.extend({

            // Initialize with negative/empty defaults
            // These will be overriden after the initial checkAuth
            defaults: {
                logged_in: false,
                user_id: ''
            },

            initialize: function () {
                _.bindAll(this);

                // Singleton user object
                // Access or listen on this throughout any module with app.session.user
                this.user = new User({ });
            },

            // Fxn to update user attributes after receiving API response
            updateSessionUser: function (userData) {
                this.user.set(_.pick(userData, _.keys(this.user.defaults)));
            },

            /*
             * Check for session from API
             * The API will parse client cookies using its secret token
             * and return a user object if authenticated
             */
            checkAuth: function (callback, args) {
                var self = this;
                this.fetch({
                    url: '/user',
                    success: function (mod, res) {
                        if (!res.error && res.user) {

                            self.set({ user_id: res.user._id, logged_in: true , user: res.user.local});
                            if ('success' in callback) callback.success(mod, res);
                        } else {
                            self.set({ logged_in: false });
                            if ('error' in callback) callback.error(mod, res);
                        }
                    }, error: function (mod, res) {
                        self.set({ logged_in: false });
                        if ('error' in callback) callback.error(mod, res);
                    }
                }).complete(function () {
                    if ('complete' in callback) callback.complete();
                });
            },

            /*
             * Abstracted fxn to make a POST request to the auth endpoint
             * This takes care of the CSRF header for security, as well as
             * updating the user and session after receiving an API response
             */
            postAuth: function (opts, callback, args) {
                var self = this;
                var postData = _.omit(opts, 'method');
                $.ajax({
                    url: '/' + opts.method,
                    contentType: 'application/json',
                    dataType: 'json',
                    type: 'POST',
                    data: JSON.stringify(_.omit(opts, 'method')),
                    success: function (res) {

                        if (!res.error) {
                            if (_.indexOf(['login', 'signUp'], opts.method) !== -1) {

                                if (res.user) {
                                    self.set({ user_id: res.user._id, logged_in: true, user: res.user.local});
                                }
                                else{
                                    self.set({ logged_in: false });
                                }
                            } else {
                                self.set({ logged_in: false });
                            }

                            if (callback && 'success' in callback) callback.success(res);
                        } else {
                            if (callback && 'error' in callback) callback.error(res);
                        }
                    },
                    error: function (mod, res) {
                        if (callback && 'error' in callback) callback.error(res);
                    }
                }).complete(function () {
                    if (callback && 'complete' in callback) callback.complete(res);
                });
            },


            login: function (opts, callback, args) {
                this.postAuth(_.extend(opts, { method: 'login' }), callback);
            },

            logout: function (opts, callback, args) {
                this.postAuth(_.extend(opts, { method: 'logout' }), callback);
            },

            signUp: function (opts, callback, args) {
                this.postAuth(_.extend(opts, { method: 'signUp' }), callback);
            }

        });

        return SessionModel;
    });

