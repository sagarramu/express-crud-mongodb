var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var path = require('path');
const fs = require('fs');
app.set('view engine', 'ejs');
app.use('/staticjs', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/staticcss', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/staticimg', express.static(path.join(__dirname, 'public/images')));

console.log(path.join(__dirname, '/staticjs'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoose = require('mongoose');
//Db Connection Start 
mongoose.Promise = global.Promise;
 //mongoose.connect('mongodb://localhost:27017/myproject1', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://sagarbhai:crZ73OCEwzA87x4H@cluster0-9qios.gcp.mongodb.net/myproject1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))
//DB Connection End

module.exports = app;
