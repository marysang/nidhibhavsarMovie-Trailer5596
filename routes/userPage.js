var couchdb = require('nano')("http://127.0.0.1:5984/");
var users = couchdb.use("users");

exports.signUpPage = function (req, res) {    
    res.render('user/signUpPage', {isAngular: true, title: 'signup', msg: "", status: "" });
}

exports.signUpReq = function (req, res) {
    
    // console.log(req.body.udata)
   var userDta = req.body.udata;
   var email = userDta.email;
//    console.log(email)
   users.view("users", "userEmail",{ key: email },  function (err, body) {
    if(!err){
        if(body.rows.length!=0){
            // console.log(1)
            res.json({ status: "already_exist", msg:"User Already Exist" }) 
            
        }else{
            var id=email.split("@")[0];
            // console.log(id)
            users.insert(userDta,id, function (error, body) {
                if (!error) {
                    res.json({ status: "success", id:id })
                    //res.redirect('/thrillerPage?id=' + availableId );
                } else {
                    res.send(error);
                }
            })
        }
    }else{
        res.send(error);
    }

   })
   
    
}


