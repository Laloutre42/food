// Module Dependencies and Setup

var express = require('express')
    , mongoose = require('mongoose')
    , http = require('http')
    , path = require('path')
    , database = require('./config/database') // load the database config
    , morgan = require('morgan') // log requests to the console (express4)
    , bodyParser = require('body-parser') 	// pull information from HTML POST (express4)
    , port = process.env.PORT || 3000 // set the port
    , methodOverride = require('method-override') // simulate DELETE and PUT (express4)
    , errorHandler = require('errorhandler')
    , app = express();

app.set('port', port);
app.use(morgan('dev')); // log every request to the console 'default', 'short', 'tiny', 'dev'
app.use(bodyParser());
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';

// Routing Initializers

app.use(express.static(__dirname + '/public'));

// Error Handling

if ('development' == env) {
    app.use(errorHandler());
} else {
    app.use(function (err, req, res, next) {
        res.render('errors/500', { status: 500 });
    });
}

// Database Connection

if ('development' == env) {
   mongoose.connect(database.url);
} else {
    // insert db connection for production
}

// Routing

require('./routes/products')(app);

// Start Server w/ DB Connection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    http.createServer(app).listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
});
