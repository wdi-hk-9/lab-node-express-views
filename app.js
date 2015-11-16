var express     = require('express');
var logger      = require('morgan');
var path        = require('path');
var bodyParser  = require('body-parser');
var mongoose   = require('mongoose');
var methodOverride  = require('method-override');

var app = express();
mongoose.connect('mongodb://localhost:27017/express-views-and-quotes');

var routes = require('./config/routes');

var helpers    = require('express-helpers');
helpers(app);

// app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up our app to accept to use EJS
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

app.use(routes);

app.listen(3000);