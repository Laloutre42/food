// Set the require.js configuration for your application.
require.config({

    shim: {
        'underscore': {
            exports: '_'
        },
        'underscore-string': {
            deps: ['underscore']
        },
        'handlebars-orig': {
            exports: 'Handlebars'
        },
        'backbone': {
            deps: ['underscore', 'underscore-string', 'jquery'],
            exports: 'Backbone'
        },
        'backbone-datagrid': {
            deps: ['backbone'],
            exports: 'Backbone.Datagrid'
        },
        'backbone-paginator': {
            deps: ['backbone'],
            exports: 'Backbone.Paginator'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'backbone-relational': {
            deps: ['backbone']
        },
        'backbone-validation-orig': {
            deps: ['backbone']
        },
        'backbone-validation': {
            deps: ['backbone-validation-orig']
        },
        'keymaster': {
            exports: 'key'
        },
        'async': {
            exports: 'async'
        },
        "typeahead-bundle": {
            deps: ["jquery"],
            exports: "Bloodhound"
        },
        "handlebars-custom-helpers": {
            deps: ["handlebars"]
        },
        "highcharts": {
            deps: ['jquery'],
            exports: "Highcharts"
        }

    },

    // Libraries
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        'underscore-string': 'lib/underscore-string',
        backbone: 'lib/backbone',
        resthub: 'lib/resthub/resthub',

        text: 'lib/text',
        i18n: 'lib/i18n',
        'bootstrap': 'lib/bootstrap/bootstrap',
        'backbone-validation-orig': 'lib/backbone-validation',
        'backbone-validation': 'lib/resthub/backbone-validation-ext',
        'handlebars-orig': 'lib/handlebars',
        'handlebars': 'lib/resthub/handlebars-helpers',
        'backbone-queryparams': 'lib/backbone-queryparams',
        'backbone-datagrid': 'lib/back  bone-datagrid',
        'backbone-paginator': 'lib/backbone.paginator',
        'backbone-associations': 'lib/backbone-associations',
        'backbone-localstorage': 'lib/backbone-localstorage',
        async: 'lib/async',
        keymaster: 'lib/keymaster',
        hbs: 'lib/resthub/require-handlebars',
        moment: 'lib/moment',
        template: '../template',
        json2: 'lib/json2',
        console: 'lib/resthub/console',

        // highcharts
        'highcharts': 'lib/highcharts/highcharts',

        // Custom
        'bootstrapValidator': 'lib/bootstrapValidator/bootstrapValidator',
        'typeahead-bundle': 'lib/custom/typeahead.bundle',

        // Custom util and handlebar helpers
        util: 'util/util',
        'handlebars-custom-helpers': 'util/handlebars-custom-helpers'
    }
});

// Load our app module and pass it to our definition function
require(['console', 'app']);
