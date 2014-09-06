// Load the list model
var util = require('../util/util');
var passport = require('passport')

// expose the routes to our app with module.exports
module.exports = function (app) {

    app.route('/signUp')

        // Sign up form
        .post(
        function (req, res, next) {
            passport.authenticate('local-signup', function (err, user, info) {

                if (err)
                    return util.handleError(err, res);

                req.logIn(user, function(err) {

                    if (err)
                        console.log(err);

                    return res.json({info: info, user: user});
                });
            })(req, res, next);
        });

    app.route('/login')

        // Login form
        .post(
        function (req, res, next) {
            passport.authenticate('local-login', function (err, user, info) {

                if (err)
                    return util.handleError(err, res);

                req.logIn(user, function(err) {

                    if (err)
                        console.log(err);

                    return res.json({info: info, user: user});
                });

            })(req, res, next);
        });

    app.route('/logout')

        // Log out
        .post(
        function (req, res, next) {
            req.logout();
            return res.json({success: true});
        });

    app.route('/user')

        // User profile
        .get(
        isLoggedIn,
        function (req, res, next) {
            return res.json({user: req.user});
        });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect(403, '/');
    }


};

