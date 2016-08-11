var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

var companyCategories = require('./api/categories/companies/company-categories.controller'),
    productCategories = require('./api/categories/products/product-categories.controller'),
    affinityCategories = require('./api/categories/affinities/affinity-categories.controller'),
    inMarketSegments = require('./api/categories/segments/in-market-segments.controller'),
    products = require('./api/products/products.route'),
    companies = require('./api/companies/companies.controller'),
    users = require('./api/users/users.controller'),
    transactions = require('./api/transactions/transactions.controller'),
    hotsite = require('./api/hotsite/hotsite.controller'),
    login = require('./support/auth/login.controller');

var app = express();

require('./config/database')('mongodb://localhost:27017/linkar'); // FIXME parametrizar isso aqui!
require('./config/passport')(app);

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(session({ secret: 'Linkar is awesome!' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/linkar/api/company-categories', companyCategories);
app.use('/linkar/api/product-categories', productCategories);
app.use('/linkar/api/affinity-categories', affinityCategories);
app.use('/linkar/api/in-market-segments', inMarketSegments);

app.use('/linkar/api/products', products);
app.use('/linkar/api/companies', companies);
app.use('/linkar/api/companies/hotsite/', hotsite);
app.use('/linkar/api/users', users);
app.use('/linkar/api/transactions', transactions);

app.use('/linkar/api/login', login);

// send to facebook to do the authentication
app.get('/linkar/api/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/linkar/api/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/'
	})
);

app.get('/linkar/api/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.status(503).send({
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

module.exports = app;
