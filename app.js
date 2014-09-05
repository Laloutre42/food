// Module Dependencies and Setup

var express = require('express')
    , mongoose = require('mongoose')
    , http = require('http')
    , database = require('./config/database') // load the database config
    , morgan = require('morgan') // log requests to the console (express4)
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser') 	// pull information from HTML POST (express4)
    , port = process.env.PORT || 3000 // set the port
    , methodOverride = require('method-override') // simulate DELETE and PUT (express4)
    , errorHandler = require('errorhandler')
    , passport = require('passport')
    , flash = require('connect-flash')
    , session = require('express-session')
    , app = express();

app.set('port', port);
app.use(morgan('dev')); // log every request to the console 'default', 'short', 'tiny', 'dev'
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser());
app.use(methodOverride());

// required for passport
app.use(session({ secret: 'ilovefoodfoodfoodfood' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport);

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

require('./routes/authentification')(app);
require('./routes/products')(app);
require('./routes/items')(app);
require('./routes/lists')(app);

// Start Server w/ DB Connection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    http.createServer(app).listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
});
