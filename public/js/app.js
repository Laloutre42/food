define(['router/app-router', "model/session"],
    function (AppRouter, SessionModel) {

        // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
        $.ajaxSetup({
            statusCode: {
                401: function () {
                    // Redirect the to the login page.
                    Backbone.history.navigate("/#login", {trigger: true});

                },
                403: function () {
                    // 403 -- Access denied
                    Backbone.history.navigate("/#denied", {trigger: true});
                }
            }
        });

        // CSRF Token for ajax post request
        var CSRF_HEADER = 'X-CSRF-Token';
        var setCSRFToken = function(securityToken) {
            jQuery.ajaxPrefilter(function(options, _, xhr) {
                if ( !xhr.crossDomain )
                    xhr.setRequestHeader(CSRF_HEADER, securityToken);
            });
        };
        setCSRFToken($('meta[name="csrf-token"]').attr('content'));

        // Global session
        var session = new SessionModel({ });

        new AppRouter(session);

        // Check the auth status upon initialization,
        // before rendering anything or matching routes
        session.checkAuth({

            // Start the backbone routing once we have captured a user's auth status
            complete: function () {

                // HTML5 pushState for URLs without hashbangs
                var hasPushstate = !!(window.history && history.pushState);
                if (hasPushstate) Backbone.history.start({ pushState: true, root: '/' });
                else Backbone.history.start();

            }
        });

    });