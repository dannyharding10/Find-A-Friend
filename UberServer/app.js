var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io-client');
var socket1 = io.connect('http://localhost:5001', {reconnect: true});
var socket2 = io.connect('http://localhost:5002', {reconnect: true});
var socket3 = io.connect('http://localhost:5003', {reconnect: true});
var socket4 = io.connect('http://localhost:5004', {reconnect: true});
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Add a connect listener
socket1.on('hangout', function (hangoudID, fromZip) {
    console.log('From Socket 1:', hangoudID, fromZip);
});

socket2.on('hangout', function (hangoudID, fromZip) {
    console.log('From Socket 2:', hangoudID, fromZip);
});

socket3.on('hangout', function (hangoudID, fromZip) {
    console.log('From Socket 3:', hangoudID, fromZip);
});

socket4.on('hangout', function (hangoudID, fromZip) {
    console.log('From Socket 4:', hangoudID, fromZip);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
