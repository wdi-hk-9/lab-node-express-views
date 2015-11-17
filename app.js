var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helpers = require('express-helpers');
var connect = require('connect');
var methodOverride = require('method-override')

var app = express();

app.use(methodOverride('_method'))
// database setup
mongoose.connect('mongodb://localhost:27017/express-views-and-quotes');

// app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

helpers(app)
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// our routes
var routes = require('./config/routes');
app.use(routes);

app.listen(3000);