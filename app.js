var fs = require('fs');
// var staticObj = require('./config.js').merge_output; // replace by nidhi 26-oct-16
var express = require('express');
var https = require('https');
var app = express();
var http = require('http');
var path = require('path');
var router = express.Router();
var couchdb = require('nano')("https://127.0.0.1:5984/");

/*
Configuration
*/

 
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
 
  app.use(require('serve-static')(__dirname + '/public'));
  // app.use(express.static('/public'));
 
  var bodyParser = require('body-parser'); 
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(bodyParser.json());


  //user login module
  var login = require('./routes/userPage.js');
  app.get('/', login.signUpPage);
  app.get('/signUpPage', login.signUpPage);
  app.post('/signupReq',login.signUpReq);
  app.get('/loginPage',login.loginPage)
  app.post('/loginPageReq',login.loginPageReq)
  app.get('/logout',login.logout)

// trailer module
  var trailer = require('./routes/trailer.js');
  app.get('/trailerPage', trailer.trailerPage);

  //watchlist
  app.get('/watchlist', trailer.watchlistPage);
  app.post('/addToWatchlist', trailer.addToWatchlist);
  app.get('/watchlist/movie/id', trailer.watchlistmovie);
  app.post('/watchlist/movie/remove/id', trailer.removeFrmWatchlist);

http.createServer(app).listen(8080, function () {
  console.log('Express server listening on port ' + 8080 );
});