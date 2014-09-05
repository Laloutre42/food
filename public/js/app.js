define(['router/app-router'],
function (AppRouter) {

    // TODO
    // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
    $.ajaxSetup({
        statusCode: {
            401: function(){
                // Redirect the to the login page.
                Backbone.history.navigate("/#login", {trigger: true});

            },
            403: function() {
                // 403 -- Access denied
                Backbone.history.navigate("/#denied", {trigger: true});
            }
        }
    });

    new AppRouter();

});