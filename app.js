var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');

// database setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-views-and-quotes');

//template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);

// app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

// our routes
var routes = require('./config/routes');
app.use(routes);

app.listen(3000);