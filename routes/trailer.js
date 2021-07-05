var couchdb = require('nano')("http://127.0.0.1:5984/");
var users = couchdb.use("users");

exports.trailerPage = function (req, res) {    
    res.render('trailer/trailerPage', {isAngular: true, title: 'trailer page', msg: "", status: "" });
}