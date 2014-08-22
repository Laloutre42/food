// Module Dependencies and Setup

var express = require('express')
, mongoose = require('mongoose')
, http = require('http')
, path = require('path')
, database = require('./config/database'), // load the database config
, morgan = require('morgan'); // log requests to the console (express4)	
, bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)	
, port = process.env.PORT || 3000, // set the port	  
, product = require('./routes/products'),	
, methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
, app = express();
	
app.set('port', port);		
app.use(morgan('dev')); // log every request to the console 'default', 'short', 'tiny', 'dev'
app.use(bodyParser);
app.use(methodOverride;

// Routing Initializers

app.use(express.static(__dirname + '/public')); 	

// Error Handling

if ('development' == app.get('env')) {
	app.use(errorHandler);
} else {
	app.use(function(err, req, res, next) {
		res.render('errors/500', { status: 500 });
	});
}

// Database Connection

if ('development' == app.get('env')) {
  mongoose.connect(database.url); // connect to mongoDB database on modulus.io
} else {
  // insert db connection for production
}

// Routing

app.get('/products', wine.findAll);
app.get('/products/:id', wine.findById);
app.post('/products', wine.addWine);
app.put('/products/:id', wine.updateWine);
app.delete('/products/:id', wine.deleteWine);

// Start Server w/ DB Connection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});
