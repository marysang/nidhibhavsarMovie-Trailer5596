var couchdb = require('nano')("http://127.0.0.1:5984/");
var users = couchdb.use("users");

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
  }

  getCurrentUTCDate = function () {
    let dt = new Date();
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let cdate = month[dt.getUTCMonth()] + " " + dt.getUTCDate() + " " + dt.getUTCFullYear() + " " + dt.getUTCHours() + ":" + dt.getUTCMinutes() + ":" + dt.getUTCSeconds() + " UTC"
    return cdate;
  }
  

exports.signUpPage = function (req, res) {    
    res.render('user/signUpPage', {isAngular: true, title: 'signup', msg: "", status: "" });
}

exports.signUpReq = function (req, res) {

   var userDta = req.body.udata;
   var email = userDta.email;

   users.view("users", "EmailToDoc",{ key: email },  function (err, body) {
    if(!err){
        if(body.rows.length!=0){
            
            res.json({ status: "already_exist", msg:"User Already Exist" }) 
            
        }else{
            var id=email.split("@")[0];
            
            users.insert(userDta,id, function (error, body) {
                if (!error) {
                    res.json({ status: "success", id:id })
                    
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

exports.loginPage = function (req, res) {    
    res.render('user/loginPage', {isAngular: true, title: 'login page', msg: "", status: "" });
}

exports.loginPageReq = function (req, res) {    
    var userDta = req.body.udata;
    var email = userDta.email;
    var pwd = userDta.password;
    
    users.view("users", "EmailToDoc",{ key: email },  function (err, body) {
     if(!err){
         if(body.rows.length>=0){
            var dta = body.rows[0].value;
            
            if(dta.email==email && dta.password==pwd){
                dta.token = randomString(128, 'aA#');
                dta.lastLogin = getCurrentUTCDate();

                users.insert(dta, function (error, body) {
                    if (!error) {
                        res.json({ status: "success", id:dta.email })
                    } else {
                        res.json({ status: "error", msg:"" })
                    }
                })
                
            }else{
                res.json({ status: "invalid_username", msg:"Invalid email or password" })
            }
         }else{
            res.json({ status: "email_not_exist", msg:"Email Id doesnot exist. Signup for an account." }) 
         }
     }else{
         res.send(err);
     }
 
    })
}

exports.logout = function (req, res) {    
    var useremail = req.params.email;
    users.view("users", "EmailToDoc",{ key: useremail },  function (err, body) {
        if(!err){
            if(body.rows.length>=0){
               var dta = body.rows[0].value;

               dta.token = '';
            //    console.log(JSON.stringify(dta))
               users.insert(dta, function (error, body) {
                if (!error) {
                    res.redirect('/loginPage');
                } else {
                    console.log(err)
                }
            })
               
            }
        }else{
            console.log(err)
        }
    
       })

    res.render('user/signUpPage', {isAngular: true, title: 'signup', msg: "", status: "" });
}