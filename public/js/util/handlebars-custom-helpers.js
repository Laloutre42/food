/**
 * Set of custom handlebars helpers
 */
define(['handlebars-orig', 'moment', 'util', 'underscore-string'], function (Handlebars, moment, Util) {

    /**
     * Display a user in the list
     * Json properties are name, status, sessionId
     */
    Handlebars.registerHelper('displayUser', function () {

        return new Handlebars.SafeString(
            "<tr><td>" + this.name + "</td><td>" + Util.convertStatusToString(this.status) + "</td><td>" + this.sessionId + "</td></tr>"
        );
    });

    Handlebars.registerHelper('select', function( value, options ){
        var $el = $('<select />').html( options.fn(this) );
        $el.find('[value=' + value + ']').attr({'selected':'selected'});
        return new Handlebars.SafeString( $el.html())
    });

    return Handlebars;

});
