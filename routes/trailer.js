var couchdb = require('nano')("http://127.0.0.1:5984/");
var users = couchdb.use("users");

exports.trailerPage = function (req, res) {    
    var useremail = req.params.email;
    
    res.render('trailer/trailerPage', {isAngular: true, title: 'trailer page', email:useremail });
}


exports.watchlistPage = function (req, res) {  
    
    var useremail = req.params.email;
    var mdata=[];

    users.view("users", "nameToWatchlist", {key:useremail}, function(err, body){
        if(!err){
            console.log(JSON.stringify(body.rows))
        }
    })

    // res.render('trailer/watchlistPage', {isAngular: true, mdata:mdata, user: user });
}


exports.addToWatchlist = function (req, res) {    
    res.render('trailer/trailerPage', {isAngular: true, title: 'trailer page', msg: "", status: "" });
}


exports.watchlistmovie = function (req, res) {    
    res.render('trailer/trailerPage', {isAngular: true, title: 'trailer page', msg: "", status: "" });
}

exports.removeFrmWatchlist = function (req, res) {    
    res.render('trailer/trailerPage', {isAngular: true, title: 'trailer page', msg: "", status: "" });
}