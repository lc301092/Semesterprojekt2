var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Connect to MongoDB mLab
var mongo = require('mongodb')
var monk = require('monk');
//var url = 'mongodb://admin:admin123@ds261755.mlab.com:61755/sp3db';
var url = 'mongodb://admin:admin123@bookingdb-shard-00-00.nurdj.mongodb.net:27017,bookingdb-shard-00-01.nurdj.mongodb.net:27017,bookingdb-shard-00-02.nurdj.mongodb.net:27017/sp3db?ssl=true&replicaSet=atlas-iy97g4-shard-0&authSource=admin&retryWrites=true&w=majority';
var db = monk(url);
db.catch(function (err) {
	console.log(err)
});
db.then(() => {
	console.log('Connected correctly to server')
});

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function (req, res, next) {
	req.db = db;
	next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
