var fs = require('fs');
var staticObj = require('./config.js').merge_output; // replace by nidhi 26-oct-16
var express = require('express');
var https = require('https');
var app = express();
var http = require('http');
var path = require('path');
var router = express.Router();
var couchdb = require('nano')(staticObj.couchdb);

/*
Configuration
*/
app.configure(function () {
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.methodOverride());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({ keepExtensions: true }));
  app.use(require('serve-static')(__dirname + '/public'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('body-parser').json());
  app.use(gateway); //nidhi gateway
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.errorHandler());
});



if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port') + " ,Time:"+getCurrentUTCDate() );
});