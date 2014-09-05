// Load the list model
util = require('../util/util');
passport = require('passport')

// expose the routes to our app with module.exports
module.exports = function (app) {

    app.route('/signup')

        // Sign up form
        .post(
        function (req, res, next) {
            passport.authenticate('local-signup', function (err, user, info) {
                if (err) {
                    return next(err); // will generate a 500 error
                }
                // Generate a JSON response reflecting authentication status
                if (!user) {
                    return res.json({ success: false, message: 'signup failed' });
                }
                return res.json({ success: true, message: 'signup succeeded' });
            })(req, res, next);
        });

    app.route('/login')

        // Login form
        .post(
        function (req, res, next) {
            passport.authenticate('local-login', function (err, user, info) {
                if (err) {
                    return next(err); // will generate a 500 error
                }
                // Generate a JSON response reflecting authentication status
                if (!user) {
                    return res.json({ success: false, message: 'authentication failed' });
                }
                return res.json({ success: true, message: 'authentication succeeded' });
            })(req, res, next);
        });

};

