var couchdb = require('nano')("https://127.0.0.1:5984/");
var users = couchdb.use("users");

exports.signUpPage = function (req, res) {    
    res.render('user/signUpPage', {isAngular: true, title: 'signup', msg: "", status: "" });
}

exports.signUpReq = function (req, res) {
    console.log(2)
    console.log(req.body)
//    var userDta = req.body.udata;
   
    // graphic_db.insert({ tags: tags_ary, caption: caption, description: descr, author: author, base64: base64, ctype: ctype, token: token,updatedAt:updatedAt,createdOn:createdOn,secret:secret, _rev: rev_no }, availableId, function (error, body) {
    //     if (!error) {
    //         generateLogs("info", author + " inserted a new image with free id = " + availableId);
    //         // res.redirect('/author_mediaGallery');
    //         res.redirect('/author_edituploadmedia?id=' + availableId + '&body=' + body.ok);
    //     } else {
    //         res.send(error);
    //     }
    // })



    // res.json({ status: "success" })
}


